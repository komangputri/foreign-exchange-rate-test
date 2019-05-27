import React, { Component } from "react";

class Converter extends Component {
    state = {
        currencies: ["USD", "CAD", "IDR", "GBP", "CHF", "SGD", "INR", "MYR", "JPY", "KRW"],
        base: "USD",
        amount: "10",
        convertTo: "",
        result: "",
        showMe: false,
        showCurrency: false
    };

    handleAddRow = e => {
        e.preventDefault();

        const {currencyItems} = this.state;
        const newItem = "SEK";

        this.setState({
            currencyItems: [...this.state.currencyItems, newItem]
        })
    };

    showSelect = e => {
        this.setState(
            {
               showMe: true 
            }
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            showCurrency: true,
            showMe: false,
        });
    }

    handleSelect = e => {
        this.setState(
            {
                [e.target.name]: e.target.value,
                convertTo: e.target.value
            }
        );
    };

    handleInput = e => {
        this.setState(
            {
                amount: e.target.value,
                result: null,
            },
            this.calculate
        );
    };

    calculate = () => {
        const amount = this.state.amount;
        if (amount === isNaN) {
            return;
        } else {
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then(res => res.json())
            .then(data => {
                const currCurrency = (data.rates[this.state.convertTo] * 1).toFixed(2);
                const result = (data.rates[this.state.convertTo] * amount).toFixed(2);
                this.setState({
                    result,
                    currCurrency
                });
            });
        }
    };

    render() {
        const { currencies, base, amount, convertTo, result, currCurrency } = this.state;
        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-4 mx-auto">
                        <div className="card card-body">
                            <p><em>USD - United State Dollars</em></p>
                            <div className="row border-bottom mb-4">
                                <h4 className="col-6">USD</h4>
                             
                                <input
                                    name="amount"
                                    type="number"
                                    value={amount}
                                    onChange={this.handleInput}
                                    className="col-6 text-right border-0 font-large"
                                />
                            </div>
                            
                            <div className="list-currency">
                                {
                                    this.state.showCurrency ? 
                                    <table className="table table-bordered table-currency">
                                        <tbody>
                                            <tr id="addr0" className="mb-3 spacer">
                                                <td>
                                                    <div className="row">
                                                        <p className="col-6 m-0">{convertTo}</p>
                                                        <p className="col-6 text-right m-0">{
                                                            amount === ""
                                                            ? "0"
                                                            : result === null
                                                            ? "Calculating..."
                                                            : result
                                                        }</p>
                                                    </div>
                                                    <p className="m-0"><em><strong>{convertTo}</strong></em></p>
                                                    <p className="m-0"><em>1 USD = {convertTo} {currCurrency}</em></p>
                                                </td>
                                                <td className="text-center">
                                                    <button onClick={this.handleRemoveRow} className="btn btn-outline-danger">
                                                        (-)
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    : null
                                }
                                
                                {
                                    this.state.showMe ? 
                                    <form className="form-inline my-2" onSubmit={this.handleSubmit}>
                                        <select
                                            name="base"
                                            value={base}
                                            onChange={this.handleSelect}
                                            className="form-control col-md-9"
                                        >
                                            {currencies.map(currency => (
                                                <option key={currency} value={currency}>
                                                  {currency}
                                                </option>
                                            ))}
                                        </select> 
                                        <button className="btn" type="submit" onClick={this.handleSubmit}>Submit</button>
                                    </form>  
                                    : null
                                }
                                      
                                <button onClick={this.showSelect} className="btn btn-primary mt-3">
                                    (+) Add more currencies
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Converter;
