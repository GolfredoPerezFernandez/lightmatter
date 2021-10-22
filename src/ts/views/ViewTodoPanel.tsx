/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { Colors, Fonts, FontSizes } from '../app/Styles';
import { Todo } from '../models/TodoModels';
import TodosStore from '../stores/TodosStore';

export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
}

interface ViewTodoPanelState {
    todo: Todo;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        color: Colors.white,
        backgroundColor: 'transparent',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
    buttonContainer2: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: Colors.menuText,
    })
};

import ImageSource from 'modules/images';
import * as UI from '@sproutch/ui';
import TodoListPanel2 from './TodoListPanel2';
export default class ViewTodoPanel extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {
    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {
        const newState: Partial<ViewTodoPanelState> = {
            todo: TodosStore.getTodoById(props.todoId),
        };

        return newState;
    }

    render() {
        return (
            <RX.View style={_styles.container}>

                <UI.Paper elevation={10} style={{ root: { flexDirection: 'row', borderRadius: 12, backgroundColor: '#323238', width: 700, height: 400, } }} >

                    <RX.View style={_styles.buttonContainer2}>

                        <RX.Text style={_styles.todoText}>
                            {this.state.todo ? this.state.todo.title : ''}
                        </RX.Text>
                        <RX.Text style={_styles.todoText}>
                            {this.state.todo ? this.state.todo.openPoll.toString() : ''}
                        </RX.Text>
                        <RX.Text style={_styles.todoText}>
                            {this.state.todo ? this.state.todo.description : ''}
                        </RX.Text>

                        <RX.View style={_styles.buttonContainer}>
                            <RX.Text style={_styles.todoText}>
                                {this.state.todo ? 'Total Votes: ' + this.state.todo.totalVotes : ''}
                            </RX.Text>
                            <RX.Text style={_styles.todoText}>
                                {this.state.todo ? 'Winning: ' + this.state.todo.winning : ''}
                            </RX.Text>
                            <RX.Text style={_styles.todoText}>
                                {this.state.todo ? 'Time Left: ' + this.state.todo.closeTime : ''}
                            </RX.Text>

                        </RX.View>

                        <RX.View style={_styles.buttonContainer}>
                            <UI.Button iconSlot={iconStyle => (
                                <RX.Image source={ImageSource.hand} style={{ marginTop: 0, alignSelf: 'center', marginRight: 5, width: 47, height: 47 }} />
                            )} style={{ content: [{ height: 80, backgroundColor: 'white', width: 200, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="+1 Vote" />
                            <UI.Button style={{ content: [{ height: 57, width: 100, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="Close Votation" />

                        </RX.View>
                    </RX.View>
                    <RX.View style={_styles.container}>
                        <TodoListPanel2 optionId={this.props.todoId} />
                    </RX.View>
                </UI.Paper>

            </RX.View>
        );
    }


}
