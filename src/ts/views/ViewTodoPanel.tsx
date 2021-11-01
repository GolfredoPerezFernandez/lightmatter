/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { Line } from 'react-chartjs-2';
import { Fonts } from '../app/Styles';
import { FontSizes } from '../app/Styles';
import { Todo } from '../models/TodoModels';
import TodosStore from '../stores/TodosStore';

import ButtonParams from './ButtonParams';
interface Data {
    x: number;
    y: number;
}
export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
}

interface ViewTodoPanelState {
    todo: Todo; zoomDomain: number; selectedDomain: number;
    arr1: Data[];
    arr2: Data[];
    width: number;
    height: number;
    isTiny: boolean;
    arr3: Data[];
    type: string;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        margin: 16,
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
    chart: RX.Styles.createViewStyle({
        backgroundColor: "white",
        width: 200,
        height: 200,
    }),
    text3: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: 13,
        color: '#9796CF',
    }),
    text1: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        color: 'white',
    }),
};


import * as _ from 'lodash';
import ResponsiveWidthStore from '../stores/ResponsiveWidthStore';
export default class ViewTodoPanel extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {


    type?: string = TodosStore.getTodoById(this.props.todoId)?.type


    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {

        const newState: Partial<ViewTodoPanelState> = {
            todo: TodosStore.getTodoById(props.todoId),
            width: ResponsiveWidthStore.getWidth(),
            height: ResponsiveWidthStore.getHeight(),
            isTiny: ResponsiveWidthStore.isSmallOrTinyScreenSize(),
        };
        return newState;
    }


    options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            fontColor: 'blue',
            text: 'Custom Chart Title'
        },
        pan: {
            enabled: true,
            mode: "xy"
        },
        zoom: {
            enabled: true,
            mode: "xy" // or 'x' for "drag" version
        },
        scales: {
            y: {
                beginAtZero: true
            },
        }
    };
    render() {

        let chartsPerRow2 = this.state.isTiny ? 2.2 : 2.5;
        let chartSize2 = Math.min(this.state.width, 1024) / chartsPerRow2;
        let chartStyle2 = [_styles.chart, { marginBottom: this.state.isTiny ? 0 : undefined, flex: 1, width: this.state.isTiny ? this.state.width * 0.8 : chartSize2, height: chartSize2 }];

        return (
            <RX.View style={[_styles.container, { height: this.state.height * 0.85, flex: 1, justifyContent: this.state.isTiny ? 'center' : 'center', alignItems: this.state.isTiny ? 'center' : 'center' }]}>

                <RX.View style={{ width: this.state.isTiny ? this.state.width * 0.90 : this.state.width * 0.50, height: this.state.isTiny ? this.state.height * 0.15 : this.state.height * 0.10, alignSelf: 'flex-start', flexDirection: this.state.isTiny ? 'column' : 'row', marginLeft: this.state.isTiny ? 0 : 100, marginBottom: 0, marginTop: this.state.isTiny ? 0 : undefined, justifyContent: 'center', alignItems: 'center' }}>
                    <RX.Text style={[_styles.text1, { alignSelf: 'flex-start', marginLeft: 20, textAlign: 'left', fontSize: this.state.isTiny ? 22 : 30, color: 'black', marginTop: this.state.isTiny ? undefined : undefined }]} >
                        {this.state.todo.title}
                    </RX.Text>
                    <RX.View style={{ flex: 1, justifyContent: 'center', alignItems: this.state.isTiny ? 'flex-end' : 'flex-end', alignSelf: this.state.isTiny ? 'center' : 'flex-start' }}>
                        <ButtonParams type={this.type} />
                    </RX.View>

                </RX.View>
                <RX.View style={{ height: this.state.isTiny ? this.state.height * 0.75 : chartSize2, alignSelf: 'center', backgroundColor: 'white', width: this.state.isTiny ? this.state.width : chartSize2 * 2, flexDirection: this.state.isTiny ? 'column' : 'row', justifyContent: this.state.isTiny ? 'center' : 'flex-start', alignItems: this.state.isTiny ? 'center' : 'flex-start' }}>

                    <RX.View style={chartStyle2}>

                        <Line data={{
                            labels: this.state.todo.imaginaryPartX,
                            datasets: [
                                {
                                    label: 'Real modelated',
                                    data: this.state.todo.dfImaginaryPartY,
                                    fill: false,
                                    backgroundColor: 'blue',
                                    borderColor: 'blue',
                                    pointRadius: 1
                                },

                                {
                                    label: 'Real original',
                                    data: this.state.todo.imaginaryPartY,
                                    fill: false,
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    pointRadius: 1
                                },
                                {
                                    label: 'difference',
                                    data: this.state.todo.difference,
                                    fill: false,
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgb(255, 99, 132)',
                                    pointRadius: 1
                                },
                            ],
                        }}
                            options={this.options} />

                    </RX.View>

                    <RX.View style={chartStyle2}>

                        <Line data={{
                            labels: this.state.todo.dfRealPartX,
                            datasets: [
                                {
                                    label: 'Imaginary modelated ',
                                    data: this.state.todo.dfRealPartY,
                                    fill: false,
                                    backgroundColor: 'red',
                                    borderColor: 'rgba(255, 99, 132, 0.2)',
                                    pointRadius: 1
                                },
                            ],
                        }}
                            options={this.options} />

                    </RX.View>

                </RX.View>


            </RX.View>
        );
    }


    handleBrush(domain: number) {
        this.setState({ zoomDomain: domain });
    }
    handleZoom(domain: number) {
        this.setState({ selectedDomain: domain });
    }
}
