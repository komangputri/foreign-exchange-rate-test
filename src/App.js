import React, { Component } from "react";

class Converter extends Component {
    state = {
        currencies: ["USD", "CAD", "IDR", "GBP", "CHF", "SGD", "INR", "MYR", "JPY", "KRW"],
        base: "USD",
        amount: "10.00",
        convertTo: "IDR",
        result: "",
        date: ""
    };

    handleSelect = e => {
        this.setState(
            {
                [e.target.name]: e.target.value,
                result: null
            },
            this.calculate
        );
    };

    handleInput = e => {
        this.setState(
            {
                amount: e.target.value,
                result: null,
                date: null
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
                const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
                this.setState({
                    result
                });
            });
        }
    };

    render() {
        const { currencies, base, amount, convertTo, result } = this.state;
        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card card-body">
                          <h5>
                            {amount} {base} is equevalent to
                          </h5>
                          <h2>
                            {amount === ""
                              ? "0"
                              : result === null
                              ? "Calculating..."
                              : result}{" "}
                            {convertTo}
                          </h2>
                          <div className="row">
                            <div className="col-lg-10">
                              <form className="form-inline mb-4">
                                <input
                                  type="number"
                                  value={amount}
                                  onChange={this.handleInput}
                                  className="form-control form-control-lg mx-3"
                                />
                                <select
                                  name="base"
                                  value={base}
                                  onChange={this.handleSelect}
                                  className="form-control form-control-lg"
                                >
                                  {currencies.map(currency => (
                                    <option key={currency} value={currency}>
                                      {currency}
                                    </option>
                                  ))}
                                </select>
                              </form>

                              <form className="form-inline mb-4">
                                <input
                                  disabled={true}
                                  value={
                                    amount === ""
                                      ? "0"
                                      : result === null
                                      ? "Calculating..."
                                      : result
                                  }
                                  className="form-control form-control-lg mx-3"
                                />
                                <select
                                  name="convertTo"
                                  value={convertTo}
                                  onChange={this.handleSelect}
                                  className="form-control form-control-lg"
                                >
                                  {currencies.map(currency => (
                                    <option key={currency} value={currency}>
                                      {currency}
                                    </option>
                                  ))}
                                </select>
                              </form>
                            </div>

                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Converter;
