/* eslint-disable */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert, ScrollView
} from 'react-native';
import ImagePicker, {Image} from 'react-native-image-crop-picker';

// interface Props{}
//
// interface State{
//     imageUri? : any
//     detectedText? : any
// }

//export default class App extends React.Component<Props,State> {
export default class App extends React.Component {
    state = {
        imageUri: "",
        detectedText: "",
        showDetectedTxt: false
    }
    // constructor( props:Props ) {
    //     super(props);
    //     this.state = {
    //         imageUri : null,
    //         detectedText: null
    //     };
    // }

    // onPress={console.log("Take photo button pressed")}
    uploadImage = async () => {
        // Check selected image is not null
        if (this.state.imageUri != null) {

            const selectedImage = this.state.imageUri;
            console.log(" selected url " + selectedImage);
            const data = new FormData();
            data.append("image", {
                name: "image",
                type: "image/jpg",              //   type: "image/png",
                uri:
                    Platform.OS === "android"
                        ? this.state.imageUri
                        : this.state.imageUri.replace("file://", "")
            });

            var url = "http://192.168.10.233:8080/inputImage";

            await fetch(url, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept" : "application/json, text/html, text/plain"  // text/html, text/plain
                }
            })
                .then(response => response.text().then(data => data))
                .then(result => this.setState({detectedText : result}))
                .catch(error => console.log("Error: "+error));
            console.log( "Detected text: "+this.state.detectedText);


            let responseJson = this.state.detectedText;
            if (responseJson !== "") {
                Alert.alert("Profile picture updated Successful");
                this.setState({showDetectedTxt : true})
            } else {
                Alert.alert("Something went wrong, please try again");
            }
        } else {
            Alert.alert("Please Select image first");
        }
    };

    takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            this.setState({imageUri: image.path})
        });
    }

    choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({imageUri: image.path})
        });
    }

    render() {
        return (
            <View style={styles.panel}>
            <ScrollView>

                <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Face Recognition From Image</Text>
        <Text style={styles.panelSubtitle}>Choose Picture To Upload</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={this.takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={this.choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.panelButton}
        onPress={this.uploadImage}>
        <Text style={styles.panelButtonTitle}>Upload</Text>
            </TouchableOpacity>
        {
            this.state.showDetectedTxt?
                <View style={styles.detectedTxt}>
                <Text style={styles.textOnIt}> Detected Text From Image :</Text>
        <Text style={styles.textOnIt}>
            {this.state.detectedText}
            </Text>
            </View>
        :null
        }
        </ScrollView>
        </View>

    )
    }
}


const styles = StyleSheet.create({
    detectedTxt:{
        padding: 30 ,
        alignItems: 'center',
        backgroundColor: "grey",
        borderRadius: 4,
        marginTop:40

    },
    textOnIt:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 17,
        marginBottom: 17
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,

    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 20,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    }
})
