/*
* TodoCompositeView.tsx
* Copyright: Microsoft 2018
*
* Main view that provides a composite view of todos on the left and
* details of the selected todo on the right.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import NavContextStore from '../stores/NavContextStore';
import * as NavModels from '../models/NavModels';
import CreateTodoPanel from './CreateTodoPanel';
import TodoListPanel from './TodoListPanel';
import ViewTodoPanel from './ViewTodoPanel';
import HomePanel from './HomePanel';
import ResponsiveWidthStore from '../stores/ResponsiveWidthStore';
import TodosStore from '../stores/TodosStore';

export interface TodoCompositeViewProps extends RX.CommonProps {
    navContext: NavModels.TodoRootNavContext;
}


interface TodoCompositeViewState {

    width: number,
    isTiny: boolean,
    imaginaryPartX: number[],
    imaginaryPartY: number[],
    height: number,
}

const _styles = {
    viewContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
    }),
    leftPanelContainer: RX.Styles.createViewStyle({
        width: 400,
        flexDirection: 'column',
    }),
    rightPanelContainer: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
    }),
};

export default class TodoCompositeView extends ComponentBase<TodoCompositeViewProps, TodoCompositeViewState> {
    protected _buildState(props: TodoCompositeViewProps, initState: boolean): Partial<TodoCompositeViewState> | undefined {
        const partialState: Partial<TodoCompositeViewState> = {
            width: ResponsiveWidthStore.getWidth(),
            height: ResponsiveWidthStore.getHeight(),
            isTiny: ResponsiveWidthStore.isSmallOrTinyScreenSize(),

            imaginaryPartX: TodosStore.getPartX(),
            imaginaryPartY: TodosStore.getPartY(),
        };
        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <RX.View style={_styles.viewContainer}>
                <RX.View style={_styles.leftPanelContainer}>
                    <TodoListPanel
                        selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                        onSelect={this._onSelectTodo}
                        onCreateNew={this._onCreateNewTodo}
                    />
                </RX.View>
                <RX.View style={_styles.rightPanelContainer}>
                    {this._renderRightPanel()}
                </RX.View>
            </RX.View>
        );
    }

    private _renderRightPanel() {
        if (this.props.navContext.showNewTodoPanel) {
            return (
                <CreateTodoPanel imaginaryPartY={this.state.imaginaryPartY} imaginaryPartX={this.state.imaginaryPartX} isTiny={this.state.isTiny} height={this.state.height} width={this.state.width} />
            );
        } else if (this.props.navContext.todoList.selectedTodoId) {
            return (
                <ViewTodoPanel todoId={this.props.navContext.todoList.selectedTodoId} />
            );
        } else if (this.props.navContext.showHomePanel) {
            return (
                <HomePanel />
            );
        } else {
            return <HomePanel />;
        }
    }

    private _onSelectTodo = (todoId: string) => {
        NavContextStore.navigateToTodoList(todoId, false);
    };

    private _onCreateNewTodo = () => {
        NavContextStore.navigateToTodoList('', true);
    };
}
