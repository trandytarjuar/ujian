import React from 'react';
import {
	Alert,
	FlatList,
	Modal,
	Image,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,	
} from 'react-native';

import { 
	Wrapper, 
	Header, 
	Left, 
	Right, 
	Container, 
	Space, 
	Row, 
	Column, 
	H1, 
	H2, 
	Footer, 
	FloatingLabelInput, 
	Picker, 
	Btn, 
	IconBtn 
} from '../utils';
import sample_data from '../../sample_data';

import ProductListItem from '../reuse/ProductListItem';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { RNCamera } from 'react-native-camera';


const PendingView = () => (
	<View
	 
	>
	
	</View>
  );

class Adduser extends React.Component {

	/*
    
	 "name": "T-Shirt 0xx Small Size nala box",
			   "sku": "SKU001",
			   "images": [
				   "http://intelvue.com/demo/app-template/light/p1.png",
				   "http://intelvue.com/demo/app-template/light/p2.png"
			   ],
			   "price": "$200",
			   "id": 1,
			   "rating": 3,
			   "brand_name": "My Brand",
			   "description": "<h3>Full Description</h3><p>Nice Dude</p>",
			   "specification": "<p>I am specs</p>"
	   */

	state = {
		showAddressModal: false,
		id: "",
		name: "",
		gender: "",
		umur: "",
		status: "",
		location: "",		
		images: "",
		key: "",
		listData: [],
		isEdit: false,
		camera_capture : ""
				 
                  
                  

	}



	_keyExtractor = (item, index) => item.id;

	inputs = {};

	componentDidMount() {

		database()
			.ref('User/')
			.on('value', snapshot => {
				//console.log('User data: ', this.snapshotToArray(snapshot.val()));
				if (snapshot.val() !== null) {
					this.setState({ listData: this.snapshotToArray(snapshot.val()) })
				}
				console.log(this.state.listData);
			});



	}





	focusNextField(field) {
		if (inputs[field] !== undefined) {
			inputs[field].focus();
		}
	}


	snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));




	render() {



		return (


			<>
				<H1>Tambah Data User</H1>

				<FlatList
					data={this.state.listData}
					keyExtractor={(item) => item.key.toString()}
					extraData={this.state}

					renderItem={({ item, index }) => <ProductListItem item={item} onPress={() => {
						this.setState({
							id: item.id,
							name: item.name,
							gender: item.gender,
							umur: item.umur,
                  			status: item.status,
							location: item.location,							
							images: item.images,
							key: item.key
						});
						this.dummyImagesTest = item.key
						this.setState({ showAddressModal: true })
						this.setState({ isEdit: true })
						
					
					}
					} />}
				/>

				<Btn label="New User" onPress={() => {
				   
					this.setState({ showAddressModal: true })
					this.setState({ isEdit: false })
				}} />

				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.showAddressModal}
				>
					{this._renderUser()}
				</Modal>
			</>


		)
	}


	_renderUser() {
		return (
			<Wrapper>
				<Header>
					<Left>
						<IconBtn icon={'x'}
							onPress={() => this.setState({
								showAddressModal: false,
								id: "",
								name: "",
								gender: "",
								umur: "",
								status: "",
								location: "",
								images: "",
								camera_capture:""
							})}
							style={{ marginLeft: -10 }}
						/>
					</Left>
				</Header>

				<Container>

					<H2>Add New User</H2>

					<FloatingLabelInput
						label="Name User"
						onChangeText={(text) => this.setState({ name: text })}
						returnKeyType={"next"}
						value={this.state.name}
						ref={input => {
							this.inputs['name'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('gender');
						}}
					/>

					<FloatingLabelInput
						label="gender"
						onChangeText={(text) => this.setState({ gemder: text })}
						returnKeyType={"next"}
						value={this.state.gender}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['gender'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('umur');
						}}
					/>

					<FloatingLabelInput
						label="umur"
						onChangeText={(text) => this.setState({ umur: text })}
						returnKeyType={"next"}
						value={this.state.location}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['location'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('gender');
						}}
					/>

						<FloatingLabelInput
						label="gender"
						onChangeText={(text) => this.setState({ gender: text })}
						returnKeyType={"next"}
						value={this.state.gender}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['gender'] = input;
						}}
						onSubmitEditing={() => {
							this.focusNextField('status');
						}}
					/>
					

					<FloatingLabelInput
						label="status"
						onChangeText={(text) => this.setState({ status: text })}
						returnKeyType={"next"}
						value={this.state.status}
						returnKeyType={"next"}
						ref={input => {
							this.inputs['status'] = input;
						}}
						onSubmitEditing={() => {
							this.Adduser();
						}}
					/>

					
			<Space/>
					<Row>
						<Column>
						
							<RNCamera
		   
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
          this.camera = camera;
		  if (status !== 'READY') {return <PendingView />
		  }else{
		  return (
			<View  style={styles.capture}>
			  
			</View>
		  );
		  }
          }}
          
        </RNCamera>
						</Column>

						<Column>
					       <Btn label = "Ambil Gambar"  onPress={() => this.takePicture(this.camera)} />
						</Column>
					</Row>
				
					<Space/>
					
					<Image	source = {{uri:this.state.images}} style={{ width: 300, height: 400 }}/>

					<Space />

					{this.addOrEdit()}
					

				</Container>

			</Wrapper>
		);
	}
	
	

	
	uploadFile = async () =>{
	
	
	try{
	    let filename = this.state.camera_capture.substring(this.state.camera_capture.lastIndexOf('/')+1);
		console.log(filename);
		const imagereference =  storage().ref(filename)
        
			await imagereference.putFile(this.state.camera_capture);
			const downloadURL = await  imagereference.getDownloadURL();
			this.setState({images:downloadURL})
			
	}catch(e){
	console.log(e);
	}
	
	
	if (this.state.isEdit) {
		
		this.editUser()
		
	}else{
	
	
	    this.Adduser();
	
	}
		 
	
	
	
	
	}
	
	takePicture = async function(camera) {
	try{
		const options = { quality: 0.5, base64: true };
		const data = await camera.takePictureAsync(options);
		//  eslint-disable-next-lin
		this.setState({images:data.uri, camera_capture:data.uri})
		console.log(data.uri);
	}catch(err){
	console.log(err)
	    }
	  };
		
		

    
	

	addOrEdit() {

		if (this.state.isEdit) {

			return (
				<Btn
					label={'Edit User'}
					onPress={() => this.uploadFile()}
				/>
			)
		} else {
			return (
				<Btn
					label={'Send Data'}
					onPress={() => this.uploadFile()}
				/>
			)
		}





	}
	Adduser() {

		console.log("data", this.state);
		/*
			  id: "",
		  name: "",
		  rating: "",
		  price: "",
		  description: null,
		  specification: "",
		  brand_name:"",
		  images: "",
	  	
		  */
		database().ref('User/').push({
			id: item.id,
			name: item.name,
			gender: item.gender,
			umur: item.umur,
			status: item.status,
			location: item.location,							
			images: item.images,
							

		}).then((data) => {
			//success callback
			console.log('data ', data)
			this.setState({
				showAddressModal: false,
				id: "",
				name: "",
				gender: "",
				umur: "",
				status: "",
				location: "",
				images: "",
				camera_capture:""
			})
		}).catch((error) => {
			//error callback
			console.log('error ', error)
			Alert.alert("Gagal Insert", error)
		})

	}


	editUser() {

		console.log("data", this.state);
		/*
			id: "",
		  name: "",
		  rating: "",
		  price: "",
		  description: null,
		  specification: "",
		  brand_name:"",
		  images: "",
		  
		  */
		database().ref('User/' + this.state.key).update({
			id: this.state.id,
			name: this.state.name,
			gender: this.state.gender,
			umur: this.state.umur,
			status: this.state.status,
			
			images: this.state.images

		}).then((data) => {
			//success callback
			console.log('data ', data)
			this.setState({
				showAddressModal: false,
				id: "",
				name: "",
				gender: "",
				umur: "",
				status: "",
				location: "",
				images: "",
				camera_capture:""
			})
		}).catch((error) => {
			//error callback
			console.log('error ', error)
			Alert.alert("Gagal Update", error)
		})

	}


}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'column',
	  backgroundColor: 'black',
	},
	preview: {
	  flex: 1,
	  justifyContent: 'flex-end',
	  alignItems: 'center',
	},
	capture: {
	  flex: 0,
	 
	 
	  padding: 15,
	  paddingHorizontal: 20,
	  alignSelf: 'center',
	  margin: 20,
	},
  });

export default Adduser;