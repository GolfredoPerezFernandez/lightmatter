/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

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
        backgroundColor: "#19173E",
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
import {
    VictoryChart,
    VictoryZoomContainer,
    VictoryLine,
    VictoryTheme, VictoryLegend,
} from 'victory';


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
    render() {

        let chartsPerRow2 = this.state.isTiny ? 2.2 : 2.5;
        let chartSize2 = Math.min(this.state.width, 1024) / chartsPerRow2;
        let chartStyle2 = [_styles.chart, { marginBottom: this.state.isTiny ? 0 : undefined, flex: 1, width: chartSize2, height: chartSize2 }];

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
                <RX.View style={{ height: chartSize2, alignSelf: 'center', backgroundColor: 'red', width: chartSize2 * 2, flexDirection: this.state.isTiny ? 'row' : 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                    <RX.View style={chartStyle2}>
                        <VictoryChart theme={VictoryTheme.material} height={chartSize2} width={chartSize2} containerComponent={<VictoryZoomContainer />}>

                            <VictoryLine
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                style={{
                                    data: { stroke: "red", strokeWidth: 3 },
                                    parent: {
                                        border: "4px solid black",
                                    }
                                }}


                                data={this.type === 'Reflectance' ? this.state.todo.reflectanceReal : this.type === 'Dielectric Function' ? this.state.todo.dielectricFunctionReal : this.type === 'Electrical Conductivity' ? this.state.todo.conductivityReal : this.type === 'Impedance' ? this.state.todo.impedanceReal : this.type === 'Refraction Index' ? this.state.todo.refractionIndex : this.type === 'Transmission' ? this.state.todo.transmissionReal : this.type === 'Absorbance' ? this.state.todo.absorbanceReal : []}
                            />


                            <VictoryLegend x={100} y={50}
                                orientation="vertical"
                                gutter={20}
                                data={[

                                    { name: "Real Part modelated", symbol: { fill: "red" }, labels: { fill: "red" } },
                                ]}
                            />
                        </VictoryChart>


                    </RX.View>

                    <RX.View style={chartStyle2}>
                        <VictoryChart theme={VictoryTheme.material} height={chartSize2} width={chartSize2} containerComponent={<VictoryZoomContainer />}>
                            <VictoryLine
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                style={{
                                    data: { stroke: "white", strokeWidth: 2 },
                                    parent: {
                                        border: "4px solid black",
                                    }
                                }}
                                data={this.type === 'Reflectance' ? this.state.todo.reflectanceImg : this.type === 'Dielectric Function' ? this.state.todo.dielectricFunctionImg : this.type === 'Electrical Conductivity' ? this.state.todo.conductivityImg : this.type === 'Electrical Conductivity' ? this.state.todo.impedanceImg : this.type === 'Refraction Index' ? this.state.todo.extincionCoef : this.type === 'Absorbance' ? this.state.todo.absorbanceImg : this.type === 'Transmission' ? this.state.todo.transmissionImg : this.type === 'Impedance' ? this.state.todo.impedanceReal : []}
                            />


                            <VictoryLegend x={100} y={50}
                                orientation="horizontal"
                                gutter={20}
                                data={[
                                    { name: "Imaginary Part Modelated", symbol: { fill: "white" }, labels: { fill: "white" } }
                                ]}
                            />
                        </VictoryChart>

                        <RX.View style={chartStyle2}>
                            <VictoryChart theme={VictoryTheme.material} height={chartSize2} width={chartSize2} containerComponent={<VictoryZoomContainer />}>
                                <VictoryLine
                                    animate={{
                                        duration: 2000,
                                        onLoad: { duration: 1000 }
                                    }}
                                    style={{
                                        data: { stroke: "white", strokeWidth: 2 },
                                        parent: {
                                            border: "4px solid black",
                                        }
                                    }}
                                    data={this.state.todo.difference}
                                />


                                <VictoryLegend x={100} y={50}
                                    orientation="horizontal"
                                    gutter={20}
                                    data={[
                                        { name: "Difference", symbol: { fill: "yellow" }, labels: { fill: "yellow" } }
                                    ]}
                                />
                            </VictoryChart>

                        </RX.View>

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
