import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Nav from '../components/TopNav'
import { Container } from '../styles/MainStyles'
import RNPickerSelect from 'react-native-picker-select';


const Settings = () => {
    const [Bank,setBank] = useState('male')
    return (
        <Container>
            <Nav hideHam={true}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.list}>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>UserName :</Text>
                        <Text style={styles.fieldText}>John Doe</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Password :</Text>
                        <Text style={styles.fieldText}>********</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Email :</Text>
                        <Text style={[styles.fieldText, { fontSize: 12 }]}>annualincome@yahoo.com</Text>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Account Number</Text>
                        <Text style={styles.fieldText}>0202002020</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldText}>Account Name</Text>
                        <Text style={styles.fieldText}>King AAA</Text>
                    </View>
                    <View style={[styles.field,{flex:1}]}>
                        <Text style={styles.fieldText}>Bank</Text>
                        <View style={{width:120}}>
                        <RNPickerSelect
                            placeholder={{}}
                            onValueChange={(value) => setBank(value)}
                            items={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                            ]}
                            value={Bank}
                            style={{fontWeight:200,fontFamily:'Poppins_400Regular'}}
                        />
                        </View>
                    </View>
                </View>
                <View style={styles.cards}>
                    <View style={styles.centered}>
                        <Text style={{ fontFamily: 'Poppins_400Regular' }}>Verification</Text>
                    </View>
                    <View style={styles.card} />
                    <View style={styles.card} />

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
        backgroundColor: '#fff',
        marginBottom: 4,
        elevation: 1,
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