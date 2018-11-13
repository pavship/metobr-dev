import React, { Component } from 'react'
import DropezoneWrapper from './DropezoneWrapper'
import axios from 'axios'
import cuid from 'cuid'
import produce from 'immer'

const uplodeLinkUrl = 'https://cloud-api.yandex.net/v1/disk/resources/upload'

export default class SmartFilesInput extends Component {
	state = {
		files: []
	}
	handleDrop = (droppedFiles, rejectedFiles) => {
		const { field, setField } = this.props
		const { files } = this.state
		const busyFileNames = files.map(f => f.file.name)
		// filter out files with repeating file names
		const errorBin = {
			nonUniqFileNames: [],
			oversizedFilesNames: rejectedFiles.map(f => f.name)
		}
		const uniqNamedFiles = droppedFiles.filter(f => {
			const uniq = !busyFileNames.includes(f.name)
			if (!uniq) errorBin.nonUniqFileNames.push(f.name)
			return uniq
		})
		// const [uniq, nonUniq] = droppedFiles.reduce((res, f) => {
		// 	busyFileNames.includes(f.name) ? res[1].push(f) : res[0].push(f)
		// 	return res
		// }, [[],[]])
		// shown nonUniq names to user in dismissable ErrorMessage
		if (errorBin.nonUniqFileNames.length) setField(field.name, { 
			err: {
				title: 'Не допускается повторение имен файлов',
				items: errorBin.nonUniqFileNames,
				isDismissable: true,
				fieldName: field.name
			}
		})
		// files which pass validation are signed with uniq cuid
		const addedFiles = uniqNamedFiles.map(f => ({ file: f, storeId: cuid(), loading: true }))
		// add files to state
		this.setState({
			files: [
				...files,
				...addedFiles
			]
		})
		// and upload
		this.upload(addedFiles)
	}
	upload = async (files) => {
		const { field, setField } = this.props
		const storeIds = files.map(f => f.storeId)
		try {
			await Promise.all(files.map(async f => {
				const uploadLink = await axios({
					url: uplodeLinkUrl,
					method: 'get',
					headers: {
						'content-type': 'application/json',
						'Authorization': 'OAuth AQAAAAACR6NbAAVG58EVND2U5UWhqlUL2ctI9P4',
					},
					params: {
						path: `app:/${f.storeId}`,
					}
				})
				console.log('uploadLink > ', uploadLink)
				const data = new FormData()
				data.append('file', f.file)
				const uploadResponse = await axios({
					url: uploadLink.data.href,
					method:'put',
					headers: {
						'content-type': 'application/json',
					},
					data
				})
				console.log('uploadResponse > ', uploadResponse)
				if (uploadResponse.statusText !== 'Created') 
					throw new Error('Повторите попытку, либо пришлите нам файлы по email. Cообщите пожалуйста о данной ошибке нашему менеджеру.')
			}))
			this.setState({
				files: produce(this.state.files, draftFiles => {
					draftFiles.forEach(f => 
						storeIds.includes(f.storeId) && delete f.loading
					)
				})
			})
			setField(field.name, {
				value: [
					...field.curVal,
					...files.map(({ file: { name }, storeId }) => ({
						name,
						storeId
					}))
				]
			})
		} catch (err) {
			this.setState({
				files: this.state.files.filter(sf => !storeIds.includes(sf.storeId))
			})
			setField(field.name, {
				err: {
					title: 'Ошибка при загрузке файлов',
					message: err.message,
					isDismissable: true,
					fieldName: field.name
				}
			})
			console.log(err)
			// TODO send notification with error info to developer
		}
	}
	cancelUpload = (name) => {

	}
	render() {
		const {
			field,
			setField,
			...rest
		} = this.props
		const { files } = this.state
		return (
			<DropezoneWrapper
				{...rest}
				files={files}
				onDrop={this.handleDrop}
				cancelUpload={this.cancelUpload}
			/>
		)
	}
}

