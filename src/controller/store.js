import {configureStore} from '@reduxjs/toolkit'
import assetscontroller from './assetscontroller'

export const store = configureStore({
reducer:{
    cryptoAssetsController :assetscontroller
}
})