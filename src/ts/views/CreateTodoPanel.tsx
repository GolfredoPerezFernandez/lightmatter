/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import { FontSizes, Styles } from '../app/Styles';
import { CreateTodoHook } from './CreateTodoHook';

interface CreateTodoPanelProps extends RX.CommonProps {
    width: number;
    height: number;
    imaginaryPartX: number[],
    imaginaryPartY: number[],
    isTiny: boolean;
}

interface CreateTodoPanelState {
    width: number;
    height: number;
    isTiny: boolean;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        padding: 16,
    }),
    editTodoItem: RX.Styles.createTextInputStyle({
        margin: 8,
        height: 32,
        paddingHorizontal: 4,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
};

export default class CreateTodoPanel extends RX.Component<CreateTodoPanelProps, CreateTodoPanelState> {
    protected _buildState(props: CreateTodoPanelProps, initState: boolean): Partial<CreateTodoPanelState> {
        const partialState: Partial<CreateTodoPanelState> = {
        };


        return partialState;
    }
    render() {
        return (
            <RX.View useSafeInsets={true} style={[_styles.container, Styles.statusBarTopMargin]}>
                <CreateTodoHook isTiny={this.props.isTiny} width={this.props.width} height={this.props.height} />
            </RX.View>
        );
    }


}
