import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItem = async (name,value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(name, jsonValue)
    } catch (e) {
        // saving error
        console.log(`Error saving ${name}`)
    }
}


export const getItem = async (value) => {
    try {
        const jsonValue = await AsyncStorage.getItem(value)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(`Error getting ${value}`)
      }
}

export const removeItem = async (name) => {
    try{
        await AsyncStorage.removeItem(name)
    }
    catch(e){
        console.log(e)
    }
}

export const checkItem = value => (value !== null && value !== undefined)