import React, { useState,useEffect } from 'react'
import { View, ActivityIndicator, Image, TouchableWithoutFeedback } from 'react-native'
import Nav from '../components/TopNav'
import { Card, Container, SmallerText, SmallText } from '../styles/MainStyles'
import {
    AdMobBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { showMessage } from 'react-native-flash-message';
import { checkItem, getItem, storeItem } from '../store/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setMiningForce } from '../store/actions';


const key = 'ca-app-pub-9917840165084516/8961210351'

// setTestDeviceIDAsync('EMULATOR');

const isToday = (someDate) => {
    const today = new Date()
    return new Date(someDate).getDate() == today.getDate() &&
      new Date(someDate).getMonth() == today.getMonth() &&
      new Date(someDate).getFullYear() == today.getFullYear()
  }

function BonusScreen() {
    const [loading, setLoading] = useState(false)
    const [adCount, setAdCount] = useState(0)
    const [displayAd,setShowAd] = useState(false)
    const { user_info:{id},miningForce } = useSelector(state => state)

// {
//     // timestamp,
//     // id,
//     // watched
// }

    useEffect(() => {
        getItem('ADS_WATCHED')
        .then(res => {
            if(checkItem(res)){
                if(res.id === id && isToday(res.timestamp)){
                    if(res.watched >= 10){
                        setAdCount(0)
                    }
                    else{
                        setAdCount(res.watched)
                    }
                } 
            }
        })
        .catch(e => console.log(e))
    }, [])

    const showAd = async () => {
        setShowAd(true)
        setLoading(true)
        // rewarded ad
        await AdMobRewarded.setAdUnitID(key); // Test ID, Replace with your-admob-unit-id
        await AdMobRewarded.requestAdAsync();
        AdMobRewarded.showAdAsync()
        .then(res => {
            storeItem('ADS_WATCHED',{
                id:id,
                timestamp:new Date(),
                watched:adCount+1
            })
            setAdCount(adCount + 1)
            if(adCount >= 10){
                const newMiningForce = (Number(0.00001)+Number(miningForce)).toFixed(5)
                dispatch(setMiningForce(newMiningForce))
                setAdCount(0)
                showMessage({
                    message:'New Mining Force',
                    description:`Your new mining force is ${newMiningForce}mBTC/s`,
                    type:'success'
                })

            }
            
        })
        .catch(e => {
            showMessage({
                message:'Ad Load Fail!',
                description:'Failed to load add',
                type:'danger'
            })
        })
        setLoading(false)


        // Set global test device ID
        // Display an interstitial
        // await AdMobInterstitial.setAdUnitID(key); // Test ID, Replace with your-admob-unit-id
        // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        // await AdMobInterstitial.showAdAsync();
    }

   

    return (
        <Container>
            <Nav page="Bonuses" />
            <Card text="Get Bonus">
                <TouchableWithoutFeedback onPress={showAd}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SmallerText text="Watch Video" />
                        {loading ?
                            <ActivityIndicator size="small" color="#273c75"/>
                            :
                            <Image source={require('../assets/icons/video.png')}
                                style={{ marginLeft: -16, height: 25 }} resizeMode="contain" />
                        }
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ alignItems: 'flex-end' }}>
                    <SmallerText text={`${adCount}/10`} />
                </View>

            </Card>

            {displayAd && 
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={key} // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds={true} // true or false
                />
            }
        </Container>
    )
}

export default BonusScreen

