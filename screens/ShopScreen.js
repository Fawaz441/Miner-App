import React, { useState, useEffect } from 'react'
import Nav from '../components/TopNav'
import { Card, Container } from '../styles/MainStyles'
import { StyleSheet, View, ScrollView,Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { useSelector,useDispatch } from 'react-redux';
import { carryOutPurchase, setMiningForce } from '../store/actions';



const screenWidth = Dimensions.get('window').width - 40


function ShopScreen() {
    const [width, setWidth] = useState([screenWidth/2, screenWidth/2])
    const {balance,miningForce} = useSelector(state => state)
    const dispatch = useDispatch()


    const tableData = [
        ['0.00001mBTC/s','0.00006BTC'],
        ['0.00002mBTC/s','0.00011BTC'],
        ['0.00006mBTC/s','0.00030BTC'],
        ['0.00012mBTC/s','0.00050BTC'],
        ['0.00025mBTC/s','0.00100BTC'],
        ['0.00130mBTC/s','0.00500BTC'],
        ['0.00280mBTC/s','0.01000BTC'],
        ['0.01500mBTC/s','0.05000BTC'],
    ]

    const checkUserWallet = item => {
        const price = Number(item[1].split('BTC')[0])
        const force = Number(item[0].split('mBTC/s')[0])
        if(balance < price){
            Alert.alert('Insufficient funds','You do not have enough BTC to purchase this mining force.')
            return;
        }
        else{
            dispatch(carryOutPurchase(price))
            dispatch(setMiningForce((Number(force)+Number(miningForce)).toFixed(5)))
        }
    }

    const confirmPurchase = index => {
        const purchaseItem = tableData[index]
        Alert.alert(
            'Confirm Purchase',`Purchase ${purchaseItem[0]} at ${purchaseItem[1]} ?`,
            [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { text: "OK", onPress: () => checkUserWallet(purchaseItem) }
              ],
              {
                cancelable: true,
              }
            )
    }
    
    return (
        <Container>
            <Nav/>
            <Card text="Balance" value={balance} />
            <View style={styles.container}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1,borderRadius:4, borderColor: '#F5F5F5' }}>
                                {
                                    tableData.length > 0 && tableData.map((rowData, index) => (
                                        <TouchableOpacity key={index} onPress={() => confirmPurchase(index)}>
                                        <Row
                                            data={rowData}
                                            widthArr={width}
                                            style={[styles.row, index % 2 && { backgroundColor: '#F5F5F5' }]}
                                            textStyle={styles.text}
                                        />
                                        </TouchableOpacity>
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 60, backgroundColor: '#fff' }
});

export default ShopScreen

