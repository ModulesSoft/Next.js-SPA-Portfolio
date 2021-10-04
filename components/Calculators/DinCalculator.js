import { Component } from "react";

export default class Calculator extends Component {

    constructor(props) {
        super(props)
        this.state =
        {
            radius: '',
            length: '',
            result: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.calculate = this.calculate.bind(this)
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    calculate(e) {
        e.preventDefault();
        let result = (this.state.length && this.state.radius) ?
            (this.state.length * this.state.radius * this.state.radius * 3.14 * 7.8 / 1000)
            : "All fields are required!"
        this.setState({
            result: result
        })

    }
    render() {
        return (
            <>
                <head>
                    <title>محاسبه وزن میلگرد DIN</title>
                </head>

                <main className="profile-page" >
                    <section className="relative block h-500-px">
                        <h1 className="m-4">محاسبه وزن میلگرد با استاندارد دین DIN</h1>
                        <form onSubmit={this.calculate} className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                            <div className="flex flex-wrap">
                                <div className="w-full m-4">
                                    <div className="inline-block">
                                        <label htmlFor="radius"
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2">شعاع</label>
                                        <input name="radius" type="number" step="0.01"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={this.state.radius} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="inline-block ">
                                        <label htmlFor="length"
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2">طول</label>
                                        <input name="length" type="number" step="0.01"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={this.state.length} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="w-full m-4">
                                    <div className="inline-block">
                                        <label htmlFor="result"
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                            وزن
                                        </label>
                                        <input name="result" type="float"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={this.state.result} readOnly></input>
                                    </div>
                                    <div className="inline-block m-2">
                                        <button type="submit"
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                            محاسبه
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </section>
                </main>
            </>
        )
    }
}

