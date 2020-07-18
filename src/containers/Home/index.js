import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ErrorMessage from '../../components/errorMessage'
import TestMessage from '../../components/testMessage'
import Swap from '../../components/swap'
import SwapModal from '../../components/swapModal'


const styles = {
    title: {
        textAlign: 'center'
    }
}

const Home = () => {
    const [hasError, setError] = useState(false)
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
            setError(true)
            setLoadingRatios(false)
        })
    }




    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/swap/mins')
    
                setMins(res.data)
            } catch {
                setError({hasError: true})
            }
        }
        
        fetchData()
    }, [])


    useEffect(() => {
        if(!hasError && user && amountTo)
            setAvailableSwap(true)
        else setAvailableSwap(false)
        }, [hasError, user, amountTo])

    const onSubmit = () => {
        const key = ratiosKey(cryptoFrom, cryptoTo)
        const ratio = ratios[key]

        axios.post(`/swap/${cryptoFrom}/${cryptoTo}`, {ratioId: ratio.id, user: user, amount: amountFrom})
        .then(res => {
            setSwapModalOpen(true)
        })
        .catch(err => {
            setError(true)
        })
    }

    return (
        <div className="row">
            {hasError? <ErrorMessage />:''}
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
