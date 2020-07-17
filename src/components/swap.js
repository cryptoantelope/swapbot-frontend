import React, {useEffect} from 'react'

const styles = {
    container: {
        fontSize: '2.3rem',
        textAlign: 'center',
        marginBottom: '3rem'
    },
    input: {
        marginBottom: '.5rem'
    },
    inputContainer: {
        marginBottom: '2rem'
    },
    button: {
        padding: '0.5rem 3rem'
    },
    formText: {
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    small: {
        fontSize: '1rem'
    }
}

const availableCryptos = ["BTC", "LTC", "ETH", "DOGE", "TRX"]

const cryptoOptions = (pre, disable) => availableCryptos.map(ac => ac !== disable? <option key={`${pre}${ac}`} value={ac}>{ac}</option>:'')


const Swap = props => {
    const {mins, user, setUser, cryptoFrom, amountFrom, setAmountFrom, cryptoTo, setCryptoTo, amountTo, setAmountTo, setCryptoFrom, ratios, fetchRatios, ratiosKey, availableSwap, onSubmit} = props
    const ratioKey = ratiosKey(cryptoFrom, cryptoTo)

    
    const onChangeCryptoFrom = e => {
        setCryptoFrom(e.target.value)
    }


    const onChangeCryptoTo = e => {
        setCryptoTo(e.target.value)
    }


    useEffect(() => {
        const getRatio = () => {
            if(ratioKey in ratios) {
		        if(ratios[ratioKey].availableAt < Date.now()) fetchRatios(cryptoFrom, cryptoTo)
	            } else {
                    fetchRatios(cryptoFrom, cryptoTo)
	            }
            }

	    if(cryptoFrom && cryptoTo) getRatio()
    }, [cryptoFrom, cryptoTo])

    useEffect(() => {
	if(ratioKey in ratios) (setAmountTo((amountFrom * ratios[ratioKey].ratio).toFixed(8)))
    }, [cryptoFrom, cryptoTo, amountFrom, ratioKey, ratios])

    useEffect(() => {
        setTimeout(() => {
            if(cryptoFrom && cryptoTo && ratios[ratioKey] < Date.now()) {
                fetchRatios(cryptoFrom, cryptoTo);
                console.log('fetch')
            }
        }, 10000);
    });

    return (
        <div style={styles.container} className="container">
            <div className="row" style={styles.inputContainer}>
                <div className="col-sm-12 col-md-2">
                    <input type="text" className="form-control form-control-lg" placeholder="user" style={styles.input} onChange={e => setUser(e.target.value)} value={user}/>
                </div>
                <div className="col-sm-12 col-md-2">
                    <input type="number" className="form-control form-control-lg" placeholder="amount" style={styles.input} aria-describedby="cryptoToSend" onChange={e => setAmountFrom(e.target.value)} step="0.000001"/>
                    {mins && cryptoFrom in mins && mins[cryptoFrom] > Number(amountFrom)?
                        <small id="cryptoToSend" className="form-text text-muted" style={styles.small}>
                            min {mins[cryptoFrom]}
                        </small>
                        :''}
                </div>
                <div className="col-sm-12 col-md-2">
                    <select name="cryptoFrom" className="form-control form-control-lg" style={styles.input} defaultValue={''} onChange={onChangeCryptoFrom}>
                        <option value={cryptoFrom}>send...</option>
                        {cryptoOptions('from', cryptoTo)}
                    </select>
                </div>
                <div style={styles.formText} className="col-sm-12 col-md-1">
                    to
                </div>
                <div className="col-sm-12 col-md-2">
                    <select name="cryptoTo" className="form-control form-control-lg" style={styles.input} defaultValue={''} onChange={onChangeCryptoTo}>
                        <option value={cryptoTo}>receive...</option>
                        {cryptoOptions('to', cryptoFrom)}
                    </select>
                </div>
                <div className="col-sm-12 col-md-3">
                    = {amountTo} {cryptoTo}
                    { amountTo && mins[cryptoTo] > Number(amountTo)?
                        <small className="form-text text-muted" style={styles.small}>
                            min {mins[cryptoTo]}
                        </small>
                        :''}
                </div>
            </div>
            <button
                type="button"
                className="btn btn-primary btn-lg"
                style={styles.button}
                onClick={onSubmit}
                disabled={!availableSwap}
            >
                SWAP
            </button>
        </div>
    )
}

export default Swap
