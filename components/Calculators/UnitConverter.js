import { Component } from "react";

export default class UnitConverter extends Component {

    pairs = [
        {
            factor: 1.8,
            firstUnit: "Mechanical KW",
            secondUnit: "Three-phase Amperage"
        },
        {
            factor: 1.44,
            firstUnit: "Kva",
            secondUnit: "Three-phase Amperage"
        },
        {
            factor: 0.8,
            firstUnit: "Kva",
            secondUnit: "KW"
        },
        {
            factor: 4.8,
            firstUnit: "Electrical KW",
            secondUnit: "Single-phase Amperage"
        },
        {
            factor: 1.36,
            firstUnit: "Mechanical KW",
            secondUnit: "Horse Power (HP)"
        }
    ]

    constructor(props) {
        super(props)
        this.state =
        {
            firstUnit: this.pairs[0].firstUnit,
            secondUnit: this.pairs[0].secondUnit,
            result: 0,
            selected: 0,
            ask: '',
            direction: true //default pairs
        }
        this.pairChange = this.pairChange.bind(this)
        this.calculate = this.calculate.bind(this)
        this.unitsChange = this.unitsChange.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }
    inputChange(e) {
        this.setState(
            {
                ask: e.target.value
            }
        )
    }
    pairChange(e) {
        this.setState(
            {
                firstUnit: this.pairs[e.target.value].firstUnit,
                secondUnit: this.pairs[e.target.value].secondUnit,
                selected: e.target.value,
                direction: true,
                ask: 0
            }
        )
    }
    unitsChange(e) {
        if (this.state.direction) {
            this.setState({
                firstUnit: this.pairs[this.state.selected].secondUnit,
                secondUnit: this.pairs[this.state.selected].firstUnit,
                direction: !this.state.direction
            })
        } else {
            this.setState({
                firstUnit: this.pairs[this.state.selected].firstUnit,
                secondUnit: this.pairs[this.state.selected].secondUnit,
                direction: !this.state.direction
            })
        }
        this.setState({
            ask: 0
        })
    }
    calculate(e) {
        e.preventDefault();
        let result = 0;
        if (this.state.direction) {
            result = (this.state.ask * this.pairs[this.state.selected].factor)
        } else {
            result = (this.state.ask / this.pairs[this.state.selected].factor)
        }
        this.setState({
            result: result
        })
    }
    render() {
        let lang = this.props.lang
        return (
            <>
                {lang == "english" ?
                    <h1 className="m-4 text-left">Electrical and Mechanical units conversion</h1>
                    :
                    <h1 className="m-4">تبدیل واحدهای الکتریکی و مکانیکی</h1>
                }
                <form onSubmit={this.calculate} className="container px-4 mx-auto flex flex-wrap items-center justify-between" dir="ltr">
                    <div className="flex flex-wrap">
                        <div className="m-4">
                            <label htmlFor="unit_select"
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-center">{lang == "english" ? "choose a pair" : "انتخاب جفت"}</label>
                            <select className="text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="unit_select" onChange={this.pairChange}>
                                <option value="0">{lang == "english" ? "Mechanical Kilo watts - 3 phase current" : "کیلووات مکانیکی - آمپر ۳فاز"}</option>
                                <option value="1">{lang == "english" ? "kVA - 3 phase current" : "کاوآ - آمپر ۳فاز"}</option>
                                <option value="2">{lang == "english" ? "kVa - kilo watts" : "کاوآ - کیلووات"}</option>
                                <option value="3">{lang == "english" ? "Electrical kilo watts - Single phase current" : "کیلووات الکتریکی - آمپر تکفاز "}</option>
                                <option value="4">{lang == "english" ? "Mechanical kilo watts - Horse Power" : "کیلووات مکانیکی - اسب بخار"}</option>
                            </select>
                        </div>
                        <div className="w-full m-4">
                            <div className="inline-block">
                                <label htmlFor="first"
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-center">
                                    {this.state.firstUnit}</label>
                                <input name="first" type="number"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={this.state.ask} onChange={this.inputChange}></input>
                            </div>
                            <div className="inline-block">
                                <button type="button" className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase p-1 pt-2 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150" onClick={this.unitsChange}>
                                    <i className="fas fa-exchange-alt"></i>
                                </button>
                            </div>
                            <div className="inline-block">
                                <label htmlFor="second"
                                    className="m-2 block uppercase text-blueGray-600 text-xs font-bold mb-2 text-center">
                                        {this.state.secondUnit}</label>
                                <input name="second" type="float"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    value={this.state.result} readOnly></input>
                            </div>
                            <div className="inline-block m-2">
                                <button type="submit"
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                    <i className="fas fa-play" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

