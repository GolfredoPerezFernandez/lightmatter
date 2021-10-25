
import { Fonts, FontSizes, Styles } from '../app/Styles';



const _styles = {
  container: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: 'transparent',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  grid: RX.Styles.createViewStyle({
    maxWidth: 1024,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#eee"
  }),
  chart: RX.Styles.createViewStyle({
    backgroundColor: "#19173E",
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  text1: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    color: 'black',
  }),
  text2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: 'white',
  }),
  text3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: '#9796CF',
  }),
  text4: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: 'black',
  }),
};

import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryTheme,
} from 'victory';

import Dropzone from 'react-dropzone';
import * as RX from 'reactxp';
import { useState } from 'react';
import TodosStore from '../stores/TodosStore';
import NavContextStore from '../stores/NavContextStore';
import ButtonParams from './ButtonParams';
import SimpleButton from '../controls/SimpleButton';
import SimpleDialogConfig from '../controls/SimpleDialogConfig';
import LM from './LM';
import { Todo } from '../models/TodoModels';

const _confirmDeleteDialogId = 'config';
export const CreateTodoHook = ({
  width,
  height,
  isTiny,
}: {
  width: number,
  height: number,
  isTiny: boolean
}) => {
  var [title, setTitle] = useState('')
  var [cargado, setCargado] = useState(false)
  var [changed, setChanged] = useState(false)
  var [data, setData] = useState<any[]>([])
  var [imaginaryPartY, setImaginaryPartY] = useState<any[]>([])
  var [imaginaryPartX, setImaginaryPartX] = useState<any[]>([])

  var chartsPerRow = 0;
  var chartSize = 0;
  var chartStyle;

  chartsPerRow = isTiny ? 2 : 2;
  chartSize = Math.min(width, 1024) / chartsPerRow;

  chartStyle = [_styles.chart, { width: chartSize, height: chartSize * 0.8 }];


  const _isChanged = () => {
    setChanged(false)
  }



  const _onPressConfiguration = (e: RX.Types.SyntheticEvent) => {
    e.stopPropagation();

    const dialog = (
      <SimpleDialogConfig
        dialogId={_confirmDeleteDialogId}
        text={'Are you sure you want to delete this todo?'}
        children={
          <RX.View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

            <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'center', marginBottom: 10 }]} >
              {'Analisis Configuration'}
            </RX.Text>
            <RX.View style={{ flex: 1, width: 400, justifyContent: 'center', alignItems: 'flex-start' }}>
              <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'left', marginBottom: 10 }]} >
                {'Iteraciones Maximas'}
              </RX.Text>
              <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'left', marginBottom: 10 }]} >
                {'Iteraciones Exitosas'}
              </RX.Text>
              <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'left', marginBottom: 10 }]} >
                {'tolerancia'}
              </RX.Text>
              <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'left', marginBottom: 10 }]} >
                {'Lamda Inicial'}
              </RX.Text>
              <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'left', marginBottom: 10 }]} >
                {'Lamda Low'}
              </RX.Text>
              <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'left', marginBottom: 10 }]} >
                {'Lamda High'}
              </RX.Text>
            </RX.View>
          </RX.View>
        }
        buttons={[{
          text: 'Ok',
          onPress: () => {
            SimpleDialogConfig.dismissAnimated(_confirmDeleteDialogId);

          },
        }, {
          text: 'Cancel',
          isCancel: true,
          onPress: () => {
            SimpleDialogConfig.dismissAnimated(_confirmDeleteDialogId);
          },
        }]}
      />
    );

    RX.Modal.show(dialog, _confirmDeleteDialogId);
  };
  function _onPressSave() {

    if (imaginaryPartX.length > 0 && imaginaryPartY.length > 0) {

      let result = new LM(imaginaryPartY, imaginaryPartX, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined).fit();

      console.log('1')

      let absorbanceReal = []
      for (let i = 0; i < result?.dfImaginaryPartX.length; i++) {
        absorbanceReal.push({ x: imaginaryPartX[i], y: imaginaryPartY[i] })

      }
      let absorbanceImg = []
      for (let i = 0; i < result?.dfImaginaryPartX.length; i++) {
        absorbanceImg.push({ x: imaginaryPartX[i], y: imaginaryPartY[i] })

      }
      let reflectanceReal = []
      for (let i = 0; i < result?.dfImaginaryPartX.length; i++) {
        reflectanceReal.push({ x: result?.dfRealPartX[i], y: result?.dfRealPartY[i] })
      }

      let reflectanceImg = []
      for (let i = 0; i < result?.dfImaginaryPartX.length; i++) {
        reflectanceImg.push({ x: result?.dfRealPartX[i], y: result?.dfImaginaryPartY[i] })
      }
      let transmissionReal = []
      for (let i = 0; i < result?.dfImaginaryPartX.length; i++) {
        transmissionReal.push({ x: result?.dfRealPartX[i], y: (1 - result?.dfRealPartY[i]) })

      }
      let transmissionImg = []
      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        transmissionImg.push({ x: result?.imaginaryPartX[i], y: (1 - result?.dfImaginaryPartY[i]) })

      }
      let arr7 = []
      for (let i = 0; i < result?.difference.length; i++) {
        arr7.push({ x: result?.imaginaryPartX[i], y: result?.difference[i] })

      }
      let dielectricFunctionImg = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        dielectricFunctionImg.push({ x: imaginaryPartX[i], y: ((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2))) })

      }
      let dielectricFunctionReal = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        dielectricFunctionReal.push({ x: imaginaryPartX[i], y: (((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2))) })

      }

      let conductivityImg = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        conductivityImg.push({ x: imaginaryPartX[i], y: (result.imaginaryPartX[i] / (4 * Math.PI)) * (4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) })
      }
      let conductivityReal = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        conductivityReal.push({ x: imaginaryPartX[i], y: (result.imaginaryPartX[i] / (4 * Math.PI)) * (4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2)) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) })
      }
      let refractionIndex = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        refractionIndex.push({ x: imaginaryPartX[i], y: Math.sqrt((((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)))) })
      }
      let exticionCoef = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        exticionCoef.push({ x: imaginaryPartX[i], y: ((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) / (2 * Math.sqrt((((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)))))) })
      }
      let ImpedanceImg = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        ImpedanceImg.push({ x: imaginaryPartX[i], y: (2 * Math.PI * result.dfImaginaryPartX[i]) })
      }
      let ImpedanceReal = []

      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        ImpedanceReal.push({ x: imaginaryPartX[i], y: (2 * Math.PI * result.dfImaginaryPartX[i]) })
      }

      const now = Date.now().valueOf();
      let newTodo: Todo = {
        id: now.toString(),
        title: title,
        dfRealPartX: [...result?.dfRealPartX],
        dfRealPartY: [...result?.dfRealPartY],
        dfImaginaryPartX: [...result?.dfImaginaryPartX],
        dfImaginaryPartY: [...result?.dfImaginaryPartY],
        imaginaryPartX: imaginaryPartX,
        imaginaryPartY: imaginaryPartY,
        creationTime: now,
        chisq: result.chisq,
        lamdaLow: result.lamdaLow,
        lamdaHigh: result.lamdaHigh,
        lamdaInit: result.lamdaInit,
        deltachi: result.deltachi,
        tolerance: result.tolerance,
        alpha: result.alpha,
        params: result.params,
        absorbanceReal: [...absorbanceReal],
        absorbanceImg: [...absorbanceImg],
        reflectanceReal: [...reflectanceReal],
        reflectanceImg: [...reflectanceImg],
        transmissionReal: [...transmissionReal],
        transmissionImg: [...transmissionImg],
        difference: [...arr7],
        type: TodosStore.getType(),
        dielectricFunctionImg: [...dielectricFunctionImg],
        dielectricFunctionReal: [...dielectricFunctionReal],
        conductivityReal: [...conductivityReal],
        conductivityImg: [...conductivityImg],
        impedanceReal: [...ImpedanceReal],
        impedanceImg: [...ImpedanceImg],
        refractionIndex: [...refractionIndex],
        extincionCoef: [...exticionCoef]
      };


      TodosStore.addTodo(newTodo);
      NavContextStore.navigateToTodoList(newTodo.id)
    }
  }
  const _loaded = async (evt: ProgressEvent) => {
    // Obtain the read file data
    let array = [];
    let array2: string[];
    let fileString = '';
    array2 = [];
    let xAxis: number[] = [];
    let yAxis: number[] = [];
    if (evt.target !== null) {
      fileString = evt.target.result;
    }
    array = fileString.split('\n');

    for (let i = 0; i < array.length; i++) {
      let strin = array[i].split(' ');
      strin.forEach(function (elemento: string, indice: number, array: string[]) {
        array2.push(elemento);
      });
    }
    for (let i = 0; i < array2.length; i++) {
      if (i % 2 === 0) {
        if (array2[i] !== "") {
          xAxis.push(parseFloat(array2[i]));
        }
      } else {
        if (array2[i] !== "") {
          yAxis.push(parseFloat(array2[i]));
        }
      }
    }
    let arr: any[] = []

    for (let i = 0; i < yAxis.length; i++) {
      arr.push({ x: xAxis[i], y: yAxis[i] })
    }
    setData([...arr]);
    await TodosStore.setPartY([...yAxis])
    await TodosStore.setPartX([...xAxis])

    setImaginaryPartX([...xAxis]);
    setImaginaryPartY([...yAxis]);
    setCargado(true)

  }

  const _onDropFile = (files: File[]) => {

    let elFile = files;
    let reader = new FileReader();
    let blob = new Blob(elFile);
    reader.readAsText(blob);
    reader.onload = _loaded;
  }


  return <RX.View useSafeInsets={true} style={[_styles.container, Styles.statusBarTopMargin, {

    backgroundColor: isTiny ? '#2A285F' : undefined,
    justifyContent: 'center', alignItems: 'center',
    margin: 20,
    alignSelf: 'center',
    borderRadius: 12,
    flexDirection: isTiny ? 'column' : 'row'
  }]}>


    <RX.View style={{ borderRadius: 12, marginTop: 20, justifyContent: 'center', alignItems: 'center', height: chartSize, width: chartSize }}>

      <RX.Text style={[_styles.text1, { alignSelf: isTiny ? 'center' : 'flex-start', textAlign: isTiny ? 'center' : 'left', fontSize: isTiny ? 24 : 32, marginBottom: 10, color: isTiny ? 'white' : 'black', }]} >
        {'Create New Model'}
      </RX.Text>
      {cargado === true ?
        <RX.View style={chartStyle}>
          <VictoryChart theme={VictoryTheme.material} height={chartSize * 0.8} width={chartSize} containerComponent={<VictoryZoomContainer />}>
            <VictoryLine
              interpolation="natural"
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              style={{
                data: { stroke: "#BC3DCB", strokeWidth: 3 },
                parent: {
                  border: "4px solid black",
                }
              }}
              data={data}
            />
          </VictoryChart>

        </RX.View>
        :
        <RX.View style={{ flex: 1, borderRadius: 12, borderColor: isTiny ? 'white' : 'black', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', height: chartSize, width: chartSize, borderWidth: 2, }}>

          <Dropzone style={{ flex: 1, borderRadius: 12, width: chartSize, height: chartSize, justifyItems: 'center', alignItems: 'center', alignSelf: 'stretch', }}
            onDrop={(files: any) => _onDropFile(files)}>
            <RX.View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, height: chartSize, width: chartSize }}>
              <RX.Text style={{ color: isTiny ? 'white' : 'black', alignSelf: 'center' }}>{'Select Or Drag And Drop The Data File Here.'}
              </RX.Text>
            </RX.View>
          </Dropzone>
        </RX.View>
      }</RX.View>
    <RX.View style={{ flex: 1, borderRadius: 12, marginBottom: 20, marginTop: 40, padding: 16, flexDirection: isTiny ? 'column' : 'row', alignItems: 'center', justifyContent: 'center' }}>


      <RX.View style={{ width: isTiny ? width * 0.9 : undefined, backgroundColor: '#2A285F', flexDirection: 'column', padding: isTiny ? 0 : 40, height: isTiny ? height * 0.60 : undefined, alignItems: isTiny ? 'center' : 'flex-start', justifyContent: isTiny ? 'center' : 'flex-start' }}>


        <RX.Text style={[_styles.text2, { alignSelf: isTiny ? 'flex-start' : 'flex-start', marginTop: isTiny ? 8 : 12, marginBottom: isTiny ? 5 : 10, marginLeft: isTiny ? width * 0.10 : undefined }]} >
          {'Material name'}
        </RX.Text>
        <RX.TextInput onChangeText={setTitle}
          accessibilityId={'EditTodoPanelTextInput'}
          value={title}

          style={[{ width: isTiny ? width * 0.70 : width * 0.24, height: isTiny ? 37 : 47, marginTop: 10, textAlign: 'center', backgroundColor: '#292558', borderRadius: 10, color: 'white' }]} placeholderTextColor={'#7877B1'} placeholder={'Nombre: Ej. Silicio'} />

        <RX.Text style={[_styles.text2, { marginTop: isTiny ? 10 : 20, marginLeft: isTiny ? width * 0.10 : undefined, alignSelf: isTiny ? 'flex-start' : 'flex-start', marginBottom: isTiny ? 5 : 10 }]} >
          {' Type of Measured'}
        </RX.Text>
        <ButtonParams isChanged={_isChanged} />


        <RX.View style={_styles.buttonContainer}>
          <SimpleButton disabled={(imaginaryPartY === [] ? true : false || changed || title === undefined ? true : false)} onPress={_onPressSave} text={'Analizar'} textStyle={_styles.text3} buttonStyle={{ borderWidth: 0, marginTop: isTiny ? 10 : 20, borderRadius: 11.48, backgroundColor: '#343261', width: isTiny ? width * 0.60 : width * 0.24, height: isTiny ? 37 : 47, justifyContent: 'center', alignItems: 'center' }} />

          <SimpleButton onPress={_onPressConfiguration} text={'Change Configuration'} textStyle={_styles.text3} buttonStyle={{ borderWidth: 0, marginTop: isTiny ? 10 : 20, borderRadius: 11.48, backgroundColor: '#343261', width: isTiny ? width * 0.60 : width * 0.24, height: isTiny ? 37 : 47, justifyContent: 'center', alignItems: 'center' }} />

        </RX.View>
      </RX.View>

    </RX.View>
  </RX.View>

}

