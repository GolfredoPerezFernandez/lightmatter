
import { Fonts, FontSizes } from '../app/Styles';


const Moralis = require('moralis');
const serverUrl = "https://n1okaz6oc6ll.usemoralis.com:2053/server";
const appId = "JhbKsNufIu2Vf3647buN0jVSiAUiDOJyYGk6hwWd";
Moralis.start({ serverUrl, appId });

import { Line } from 'react-chartjs-2';

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
    backgroundColor: "white",
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  }),
  text1: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    color: 'black',
  }),
  text2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: 'black',
  }),
  text3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: '#9796CF',
  }),
  text4: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: 'white',
  }),
};


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
import * as NumericInput from "react-numeric-input";

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
  var [type, setType] = useState('')
  var [title, setTitle] = useState('')
  var [NDONE, setNDONE] = useState<any>(1)
  var [lamdaH, setLamdaH] = useState<any>(10)
  var [lamdaL, setLamdaL] = useState<any>(0.001)
  var [lamdaI, setLamdaI] = useState<any>(0.1)
  var [tol, setTol] = useState<any>(0.01)
  var [iterMax, setIterMax] = useState<any>(5)
  var [cargando, setCargando] = useState(false)
  var [cargado, setCargado] = useState(false)
  var [imaginaryPartY, setImaginaryPartY] = useState<any[]>([])
  var [imaginaryPartX, setImaginaryPartX] = useState<any[]>([])

  var chartStyle;


  chartStyle = [_styles.chart, { flex: 1, }];


  const _isChanged = (type: string) => {
    setType(type)
  }



  const _onPressConfiguration = (e: RX.Types.SyntheticEvent) => {
    e.stopPropagation();

    const dialog = (
      <SimpleDialogConfig
        dialogId={_confirmDeleteDialogId}
        text={'Are you sure you want to delete this todo?'}
        children={
          <RX.View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', flex: 1 }}>

            <RX.Text style={[_styles.text4, { marginTop: 20, textAlign: 'center', marginBottom: 10 }]} >
              {'Analisis Configuration'}
            </RX.Text>
            <RX.View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-start' }}>
              <RX.View style={{ height: 47, marginTop: 10, marginBottom: 10, flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <RX.Text style={[_styles.text4, { marginRight: 30, textAlign: 'left', }]} >
                  {'Iteraciones Maximas'}
                </RX.Text>
                <NumericInput height={34} size={5} snap step={1} min={1} max={10000} onChange={setIterMax} value={iterMax} />


              </RX.View>
              <RX.View style={{ height: 47, marginTop: 10, marginBottom: 10, flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <RX.Text style={[_styles.text4, { marginRight: 30, textAlign: 'left', }]} >
                  {'Iteraciones Exitosas'}
                </RX.Text>

                <NumericInput height={34} size={5} snap step={1} min={1} max={1000} onChange={setNDONE} value={NDONE} />



              </RX.View>
              <RX.View style={{ height: 47, marginTop: 10, marginBottom: 10, flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <RX.Text style={[_styles.text4, { marginRight: 30, textAlign: 'left', }]} >
                  {'tolerancia'}
                </RX.Text>

                <NumericInput height={34} size={5} snap step={0.01} min={0.001} max={10} onChange={setTol} value={tol} />


              </RX.View>
              <RX.View style={{ height: 47, marginTop: 10, marginBottom: 10, flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <RX.Text style={[_styles.text4, { marginRight: 30, textAlign: 'left', }]} >
                  {'Lamda Inicial'}
                </RX.Text>

                <NumericInput height={34} size={5} snap step={0.001} min={0.001} max={10} onChange={setLamdaI} value={lamdaI} />


              </RX.View>
              <RX.View style={{ height: 47, marginTop: 10, marginBottom: 10, flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <RX.Text style={[_styles.text4, { marginRight: 30, textAlign: 'left', }]} >
                  {'Lamda Low'}
                </RX.Text>
                <NumericInput height={34} size={5} snap step={0.1} min={0.0001} max={10} onChange={setLamdaL} value={lamdaL} />


              </RX.View>
              <RX.View style={{ height: 47, marginTop: 10, marginBottom: 10, flex: 1, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                <RX.Text style={[_styles.text4, { marginRight: 30, textAlign: 'left', }]} >
                  {'Lamda High'}
                </RX.Text>
                <NumericInput height={34} size={5} snap step={1} min={1} max={100} onChange={setLamdaH} value={lamdaH} />



              </RX.View>
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
  async function _onPressSave() {
    setCargando(true)
    if (imaginaryPartX.length > 0 && imaginaryPartY.length > 0) {

      let result = await Moralis.Cloud.run('LM', { partY: imaginaryPartY, partX: imaginaryPartX, a: undefined, iterMax, NDone: NDONE, gridType: undefined, tol, lamdaInit: lamdaI, lamdaLow: lamdaL, lamdaHigh: lamdaH })

      if (result) {
        let absorbanceReal = []
        for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
          absorbanceReal.push({ x: imaginaryPartX[i], y: imaginaryPartY[i] })

        }
        let absorbanceImg = []
        for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
          absorbanceImg.push({ x: imaginaryPartX[i], y: imaginaryPartY[i] })

        }
        let reflectanceReal = []
        for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
          reflectanceReal.push({ x: result.dfRealPartX[i], y: result.dfRealPartY[i] })
        }

        let reflectanceImg = []
        for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
          reflectanceImg.push({ x: result.dfRealPartX[i], y: result.dfImaginaryPartY[i] })
        }
        let transmissionReal = []
        for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
          transmissionReal.push({ x: result.dfRealPartX[i], y: (1 - result.dfRealPartY[i]) })

        }
        let transmissionImg = []
        for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
          transmissionImg.push({ x: result.imaginaryPartX[i], y: (1 - result.dfImaginaryPartY[i]) })

        }
        let dielectricFunctionImg = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          dielectricFunctionImg.push({ x: imaginaryPartX[i], y: ((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2))) })

        }
        let dielectricFunctionReal = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          dielectricFunctionReal.push({ x: imaginaryPartX[i], y: (((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2))) })

        }

        let conductivityImg = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          conductivityImg.push({ x: imaginaryPartX[i], y: (result.imaginaryPartX[i] / (4 * Math.PI)) * (4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) })
        }
        let conductivityReal = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          conductivityReal.push({ x: imaginaryPartX[i], y: (result.imaginaryPartX[i] / (4 * Math.PI)) * (4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2)) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) })
        }
        let refractionIndex = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          refractionIndex.push({ x: imaginaryPartX[i], y: Math.sqrt((((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)))) })
        }
        let exticionCoef = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          exticionCoef.push({ x: imaginaryPartX[i], y: ((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) / (2 * Math.sqrt((((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)))))) })
        }
        let ImpedanceImg = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          ImpedanceImg.push({ x: imaginaryPartX[i], y: (2 * Math.PI * result.dfImaginaryPartX[i]) })
        }
        let ImpedanceReal = []

        for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
          ImpedanceReal.push({ x: imaginaryPartX[i], y: (2 * Math.PI * result.dfImaginaryPartX[i]) })
        }

        const now = Date.now().valueOf();
        let newTodo: Todo = {
          id: now.toString(),
          title: title,
          dfRealPartX: [...result.dfRealPartX],
          dfRealPartY: [...result.dfRealPartY],
          dfImaginaryPartX: [...result.dfImaginaryPartX],
          dfImaginaryPartY: [...result.dfImaginaryPartY],
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
          difference: [...result.difference],
          type: TodosStore.getType(),
          dielectricFunctionImg: [...dielectricFunctionImg],
          dielectricFunctionReal: [...dielectricFunctionReal],
          conductivityReal: [...conductivityReal],
          conductivityImg: [...conductivityImg],
          impedanceReal: [...ImpedanceReal],
          impedanceImg: [...ImpedanceImg],
          termalReal: [...ImpedanceReal],
          termalImg: [...ImpedanceImg],
          refractionIndex: [...refractionIndex],
          extincionCoef: [...exticionCoef]
        };


        TodosStore.addTodo(newTodo);
        setCargando(false)

        NavContextStore.navigateToTodoList(newTodo.id)
      }
    }
  }

  async function _onPressSave2() {
    setCargando(true)
    if (imaginaryPartX.length > 0 && imaginaryPartY.length > 0) {

      let result = new LM(imaginaryPartY, imaginaryPartX, undefined, iterMax, NDONE, undefined, tol, lamdaI, lamdaL, lamdaH).fit();


      let absorbanceReal = []
      for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
        absorbanceReal.push({ x: imaginaryPartX[i], y: imaginaryPartY[i] })

      }
      let absorbanceImg = []
      for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
        absorbanceImg.push({ x: imaginaryPartX[i], y: imaginaryPartY[i] })

      }
      let reflectanceReal = []
      for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
        reflectanceReal.push({ x: result.dfRealPartX[i], y: result.dfRealPartY[i] })
      }

      let reflectanceImg = []
      for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
        reflectanceImg.push({ x: result.dfRealPartX[i], y: result.dfImaginaryPartY[i] })
      }
      let transmissionReal = []
      for (let i = 0; i < result.dfImaginaryPartX.length; i++) {
        transmissionReal.push({ x: result.dfRealPartX[i], y: (1 - result.dfRealPartY[i]) })

      }
      let transmissionImg = []
      for (let i = 0; i < result?.dfImaginaryPartY.length; i++) {
        transmissionImg.push({ x: result.imaginaryPartX[i], y: (1 - result.dfImaginaryPartY[i]) })

      }
      let dielectricFunctionImg = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        dielectricFunctionImg.push({ x: imaginaryPartX[i], y: ((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2))) })

      }
      let dielectricFunctionReal = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        dielectricFunctionReal.push({ x: imaginaryPartX[i], y: (((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2))) })

      }

      let conductivityImg = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        conductivityImg.push({ x: imaginaryPartX[i], y: (result.imaginaryPartX[i] / (4 * Math.PI)) * (4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) })
      }
      let conductivityReal = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        conductivityReal.push({ x: imaginaryPartX[i], y: (result.imaginaryPartX[i] / (4 * Math.PI)) * (4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2)) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) })
      }
      let refractionIndex = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        refractionIndex.push({ x: imaginaryPartX[i], y: Math.sqrt((((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)))) })
      }
      let exticionCoef = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        exticionCoef.push({ x: imaginaryPartX[i], y: ((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i] * Math.sin(result.dfRealPartY[i]))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)) / (2 * Math.sqrt((((4 * Math.sqrt(result.dfImaginaryPartY[i]) * (1 - result.dfImaginaryPartY[i]) * Math.pow(Math.sin(result.dfRealPartY[i]), 2))) / (Math.pow(1 + result.dfImaginaryPartY[i] - 2 * Math.sqrt(result.dfImaginaryPartY[i]) * Math.cos(result.dfRealPartY[i]), 2)))))) })
      }
      let ImpedanceImg = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        ImpedanceImg.push({ x: imaginaryPartX[i], y: (2 * Math.PI * result.dfImaginaryPartX[i]) })
      }
      let ImpedanceReal = []

      for (let i = 0; i < result.dfImaginaryPartY.length; i++) {
        ImpedanceReal.push({ x: imaginaryPartX[i], y: (2 * Math.PI * result.dfImaginaryPartX[i]) })
      }

      const now = Date.now().valueOf();
      let newTodo: Todo = {
        id: now.toString(),
        title: title,
        dfRealPartX: [...result.dfRealPartX],
        dfRealPartY: [...result.dfRealPartY],
        dfImaginaryPartX: [...result.dfImaginaryPartX],
        dfImaginaryPartY: [...result.dfImaginaryPartY],
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
        difference: [...result.difference],
        type: TodosStore.getType(),
        dielectricFunctionImg: [...dielectricFunctionImg],
        dielectricFunctionReal: [...dielectricFunctionReal],
        conductivityReal: [...conductivityReal],
        conductivityImg: [...conductivityImg],
        impedanceReal: [...ImpedanceReal],
        impedanceImg: [...ImpedanceImg],
        termalReal: [...ImpedanceReal],
        termalImg: [...ImpedanceImg],
        refractionIndex: [...refractionIndex],
        extincionCoef: [...exticionCoef]
      };


      TodosStore.addTodo(newTodo);
      setCargando(false)

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
  const valores = {
    labels: imaginaryPartX,
    datasets: [
      {
        label: 'Reflectance Real',
        data: imaginaryPartY,
        fill: false,
        backgroundColor: 'black',
        borderColor: 'black',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    pan: {
      enabled: true,
      mode: "xy"
    },
    zoom: {
      enabled: true,
      mode: "xy" // or 'x' for "drag" version
    },
  };
  return <RX.View style={{ alignSelf: 'stretch', borderRadius: 12, flexDirection: isTiny ? 'column' : 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center', flex: 1 }}>


    <RX.View style={{ paddingHorizontal: isTiny ? 40 : 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignSelf: 'stretch', flex: 50, padding: 20 }}>
      <RX.Text style={[_styles.text1, { alignSelf: isTiny ? 'center' : 'flex-start', textAlign: isTiny ? 'center' : 'left', fontSize: isTiny ? 24 : 32, marginBottom: 10, color: 'black', }]} >
        {'Create New Model'}
      </RX.Text>
      {cargado === true ?
        <RX.View style={chartStyle}>
          <Line data={valores} options={options} />

        </RX.View>
        :
        <RX.View style={{ flex: 1, alignSelf: 'stretch', borderRadius: 12, borderColor: 'black', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', borderWidth: 2, }}>

          <Dropzone style={{ flex: 1, borderRadius: 12, justifyItems: 'center', alignItems: 'center', alignSelf: 'stretch', }}
            onDrop={(files: any) => _onDropFile(files)}>
            <RX.View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, flex: 1, alignSelf: 'stretch' }}>
              <RX.Text style={{ color: 'black', alignSelf: 'center' }}>{'Select Or Drag And Drop The Data File Here.'}
              </RX.Text>
            </RX.View>
          </Dropzone>
        </RX.View>
      }


      <RX.Text style={[_styles.text2, { alignSelf: isTiny ? 'flex-start' : 'flex-start', marginTop: isTiny ? 8 : 12, marginBottom: isTiny ? 5 : 10, marginLeft: isTiny ? width * 0.10 : undefined }]} >
        {'data points ' + imaginaryPartY.length}
      </RX.Text>
    </RX.View>


    <RX.View style={{ flex: 50, paddingBottom: isTiny ? 20 : 0, alignSelf: 'stretch', flexDirection: 'column', borderRadius: 12, padding: isTiny ? 5 : 40, alignItems: isTiny ? 'center' : 'flex-start', justifyContent: isTiny ? 'flex-start' : 'flex-start' }}>


      <RX.Text style={[_styles.text2, { alignSelf: isTiny ? 'flex-start' : 'flex-start', marginTop: isTiny ? 0 : 12, marginBottom: isTiny ? 5 : 10, marginLeft: isTiny ? width * 0.10 : undefined }]} >
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
        {cargando === false ? <SimpleButton disabled={(imaginaryPartY.length > 500 ? true : false || title === '' || type === '' ? true : false)} onPress={_onPressSave} text={'Analizar en Servidor'} textStyle={_styles.text3} buttonStyle={{ borderWidth: 0, marginTop: isTiny ? 10 : 20, borderRadius: 11.48, backgroundColor: '#343261', width: isTiny ? width * 0.60 : width * 0.24, height: isTiny ? 37 : 47, justifyContent: 'center', alignItems: 'center' }} />
          : null
        }
        {cargando === false ? <SimpleButton disabled={(imaginaryPartY.length == 0 ? true : false || title === '' || type === '' ? true : false)} onPress={_onPressSave2} text={'Analizar en mi Pc'} textStyle={_styles.text3} buttonStyle={{ borderWidth: 0, marginTop: isTiny ? 10 : 20, borderRadius: 11.48, backgroundColor: '#343261', width: isTiny ? width * 0.60 : width * 0.24, height: isTiny ? 37 : 47, justifyContent: 'center', alignItems: 'center' }} />
          : null
        }

        <SimpleButton onPress={_onPressConfiguration} text={'Change Configuration'} textStyle={_styles.text3} buttonStyle={{ borderWidth: 0, marginTop: isTiny ? 10 : 20, borderRadius: 11.48, backgroundColor: '#343261', width: isTiny ? width * 0.60 : width * 0.24, height: isTiny ? 37 : 47, justifyContent: 'center', alignItems: 'center' }} />
      </RX.View>

    </RX.View>


  </RX.View>



}

