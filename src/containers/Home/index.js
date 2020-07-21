import React, {useState, useEffect} from 'react'
import axios from 'axios'

import TestMessage from '../../components/testMessage'
import Swap from '../../components/swap'
import SwapModal from '../../components/swapModal'


const styles = {
    title: {
        textAlign: 'center'
    }
}

const Home = props => {
    const {errors, setErrors} = props
    const [mins, setMins] = useState({})
    const [user, setUser] = useState('')
    const [cryptoFrom, setCryptoFrom] = useState('')
    const [amountFrom, setAmountFrom] = useState(0)
    const [cryptoTo, setCryptoTo] = useState('')
    const [amountTo, setAmountTo] = useState(0)
    const [ratios, setRatios] = useState({})
    const [loadingRatios, setLoadingRatios] = useState(false)
    const [swapModalOpen, setSwapModalOpen] = useState(false)
    const [availaibleSwap, setAvailableSwap] = useState(false)
    

    const handleClose = () => setSwapModalOpen(false);
    
    const ratiosKey = (c1, c2) => `${c1}${c2}`


    const fetchRatios = (crypto1, crypto2) => {
        const key = ratiosKey(crypto1, crypto2)
        setLoadingRatios(true)
        
        axios.get(`/ratio/${crypto1}/${crypto2}`)
	    .then(res => {
	        const r = ratios
	        r[key] = res.data

            setRatios(r)
            setLoadingRatios(false)
        })
        .catch(err => {
            const newErrors = [...errors, {msg: "Error getting ratios, please try again later", date: Date.now()}]
            setErrors(newErrors)
            setLoadingRatios(false)
        })
    }




    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/swap/mins')
    
                setMins(res.data)
            } catch {
                const newErrors = [...errors, {msg: "Error getting some data, please try again later", date: Date.now()}]
                setErrors(newErrors)
            }
        }
        
        fetchData()
    }, [])


    useEffect(() => {
        if( user
            && amountFrom
            && amountTo
            && mins[cryptoFrom]
            && mins[cryptoFrom] <= Number(amountFrom)
            && mins[cryptoTo]
            && mins[cryptoTo] <= Number(amountTo)
        )
            setAvailableSwap(true)
        else setAvailableSwap(false)
        }, [user, amountTo])


    const onSubmit = () => {
        const key = ratiosKey(cryptoFrom, cryptoTo)
        const ratio = ratios[key]

        axios.post(`/swap/${cryptoFrom}/${cryptoTo}`, {ratioId: ratio.id, user: user, amount: amountFrom})
        .then(res => {
            setSwapModalOpen(true)
        })
        .catch(err => {
            const newErrors = [...errors]

            if(err.response) newErrors.push({msg: err.response.data.error, date: Date.now()})
            else newErrors.push({msg: "submit error", date: Date.now()})
            
            setErrors(newErrors)
        })
    }

    return (
        <div className="row">
            <TestMessage />
            {swapModalOpen? 
                <SwapModal
                    user={user}
                    show={swapModalOpen}
                    amountFrom={amountFrom}
                    cryptoFrom={cryptoFrom}
                    amountTo={amountTo}
                    cryptoTo={cryptoTo}
                    amount={amountTo}
                    handleClose={handleClose} 
                />:''}
            <div className="col">
                <h1 style={styles.title}>wolf.bet exchange</h1>
                <Swap 
                    user={user}
                    setUser={setUser}
                    cryptoFrom={cryptoFrom}
                    setCryptoFrom={setCryptoFrom}
                    amountFrom={amountFrom}
                    setAmountFrom={setAmountFrom}
                    cryptoTo={cryptoTo}
                    setCryptoTo={setCryptoTo}
                    amountTo={amountTo}
                    setAmountTo={setAmountTo}
                    mins={mins}
                    ratios={ratios}
                    loadingRatios={loadingRatios}
                    fetchRatios={fetchRatios}
                    ratiosKey={ratiosKey}
                    availableSwap={availaibleSwap}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}

export default Home
