import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, Platform, TouchableWithoutFeedback } from 'react-native'
import Nav from '../components/TopNav'
import { Container } from '../styles/MainStyles'
// import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { checkItem, getItem, storeItem } from '../store/storage';

const Settings = () => {
    const [idImage, setIDImage] = useState(null)
    const [BankImage, setBankImage] = useState(null)


    const getImage = async (type) => {
        const image = await getItem(type)
        if (checkItem(image)) {
            if (type == 'ID') {
                setIDImage(image)
            }
            if (type == 'BANK') {
                setBankImage(image)
            }
        }
    }



    useEffect(() => {
        (async () => {
            await getImage('ID')
            await getImage('BANK')
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            if (type == 'ID') {
                setIDImage(result.uri)
            }
            if (type == 'BANK') {
                setBankImage(result.uri)
            }
            storeItem(type, result.uri)
        }
    };


    const { email, bank,
        account_number,
        account_name,
        referral_code } = useSelector(state => state.user_info)


    return (
        <Container>
            <Nav hideHam={true} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.list}>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Username :</Text>
                        <Text style={styles.fieldText}>{account_name || ''}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Password :</Text>
                        <Text style={styles.fieldText}>********</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Email :</Text>
                        <Text style={[styles.fieldText, { fontSize: 12 }]}>{email || ''}</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Account Number :</Text>
                        <Text style={styles.fieldText}>{account_number || ''}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Account Name :</Text>
                        <Text style={styles.fieldText}>{account_name || ''}</Text>
                    </View>
                    <View style={[styles.field]}>
                        <Text style={styles.fieldText}>Bank :</Text>
                        <Text style={styles.fieldText}>{bank || ''}</Text>

                        {/* <View style={{width:120}}> */}

                        {/* <RNPickerSelect
                            placeholder={{}}
                            onValueChange={(value) => setBank(value)}
                            items={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                            ]}
                            value={Bank}
                            style={{fontWeight:200,fontFamily:'Poppins_400Regular'}}
                        /> */}
                        {/* </View> */}
                    </View>
                </View>
                <View style={styles.cards}>
                    <View style={styles.centered}>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }}>Verification</Text>
                    </View>

                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 10 }}>ID Card</Text>
                    <TouchableWithoutFeedback onPress={() => pickImage('ID')}>
                        <View style={styles.card}>
                            {idImage ?
                                <Image style={styles.image} source={{ uri: idImage }} />
                                :
                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12 }}>
                                    Please Select an image
                                </Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 10 }}>Bank Account</Text>
                    <TouchableWithoutFeedback onPress={() => pickImage('BANK')}>
                        <View style={styles.card}>
                            {BankImage ? <Image style={styles.image} source={{ uri: BankImage }} />
                                :
                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12 }}>
                                    Please Select an image
                                </Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    list: {
        borderRadius: 3,
        marginTop: 25
    },
    field: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 7,
        marginBottom: 5,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    fieldText: {
        fontFamily: 'Poppins_400Regular',
        color: '#333'
    },
    cards: {
        marginVertical: 10
    },
    card: {
        height: 200,
        borderColor: '#f5f5f5',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        // backgroundColor: '#fff',
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center',
    },
    image: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    wrapper: {
        paddingHorizontal: 3,
        borderRadius: 5,
        borderColor: '#333',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Settings