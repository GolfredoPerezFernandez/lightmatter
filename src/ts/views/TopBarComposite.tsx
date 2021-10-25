/*
* TopBarComposite.tsx
* Copyright: Microsoft 2018
*
* Horizontal bar that appears on the top of every view within the app
* when it's using composite layout (as opposed to stack-based layout).
*/

import ImageSource from 'modules/images';
import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import NavContextStore from '../stores/NavContextStore';
import { Colors, Fonts, FontSizes } from '../app/Styles';
import CurrentUserStore from '../stores/CurrentUserStore';


const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");

Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'


const _styles = {
    background: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        height: 88,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
    }),
    logoContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    barControlsContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    }),
    logoImage: RX.Styles.createImageStyle({
        height: 24,
        width: 26,
    }),
    logoText: RX.Styles.createTextStyle({
        font: Fonts.displaySemibold,
        fontSize: FontSizes.size20,
        marginHorizontal: 4,
        color: 'black',
    }),
    linkText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.menuItem,
        marginHorizontal: 8,
        color: Colors.menuText,
    }),
    linkTextHover: RX.Styles.createTextStyle({
        color: Colors.menuTextHover,
    }),
    backButtonContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    backText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size16,
        color: Colors.menuText,
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: Colors.menuText,
    })
};

export interface TopBarCompositeProps extends RX.CommonProps {
    showBackButton: boolean;
    onBack?: () => void;
}

export interface TopBarCompositeState extends RX.CommonProps {
    isLogin: boolean;
}
export default class TopBarComposite extends ComponentBase<TopBarCompositeProps, TopBarCompositeState> {

    protected _buildState(props: TopBarCompositeProps, initState: boolean): Partial<TopBarCompositeState> {
        const newState: Partial<TopBarCompositeState> = {
            isLogin: CurrentUserStore.getLogin(),
        };

        return newState;
    }

    render(): JSX.Element | null {
        let leftContents: JSX.Element | undefined;

        if (this.props.showBackButton) {
            leftContents = (
                <HoverButton onPress={this._onPressBack} onRenderChild={this._renderBackButton} />
            );
        } else {
            leftContents = (
                <RX.Button onPress={this._onPressLogo}>
                    <RX.View style={_styles.logoContainer}>
                        <RX.Image source={ImageSource.todoLogo} style={_styles.logoImage} />
                        <RX.Text style={_styles.logoText}>
                            {'LightMatter'}
                        </RX.Text>
                    </RX.View>
                </RX.Button>
            );
        }
        return (
            <RX.View style={_styles.background}>
                {leftContents}
            </RX.View>
        );
    }
    _onPressTodo = async (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation()

        return await Moralis.Web3.authenticate().then(async (user: any) => {

            let createdAt = user.get('createdAt')
            let sessionToken = user.get('sessionToken')
            let address = user.get('ethAddress')

            console.log('createdAt ' + createdAt)
            console.log('sessionToken ' + sessionToken)
            console.log('address ' + address)
        })
    };


    private _onPressBack = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onBack) {
            this.props.onBack();
        }
    };

    private _renderBackButton = (isHovering: boolean) => (
        <RX.View style={_styles.backButtonContainer}>
            <RX.Text style={[_styles.backText, isHovering ? _styles.linkTextHover : undefined]}>
                {'Back'}
            </RX.Text>
        </RX.View>
    );

    private _onPressLogo = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        NavContextStore.navigateToTodoList('', false);
    };

}
