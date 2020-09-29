import React, { useRef, useState } from "react";
import {
  IonAlert,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BmiResult from "./components/BmiResult";
import BmiControls from "./components/BmiControls";
import InputControls from "./components/InputControls"
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [error, setError] = useState<string>();
  const [calUnits, setCalUnits] = useState<'m/kg' | 'ft/lbs'>('m/kg');
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;
    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      setError("Please enter a valid (non-negative) input number");
      return;
    }
    const weightConversionFactor = calUnits === 'ft/lbs' ? 2.2 : 1;
    const heightConversionFactor = calUnits === 'ft/lbs' ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = +weight / (height * +height);
    //console.log(bmi);
    setCalculatedBMI(bmi);
  };
  const resetInputs = () => {
    heightInputRef.current!.value = "";
    weightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError('');
  }

  const selectCalcUnitHandler = (selectedValue: 'm/kg' | 'ft/lbs') => {
    setCalUnits(selectedValue)
  }

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error} buttons={[{text: 'Okay', handler: clearError}]} />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControls selectedValue = {calUnits} onSelectValue={selectCalcUnitHandler} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> Your Height ({calUnits === 'm/kg' ? 'meters' : 'feets'})</IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"> Your Weight ({calUnits === 'm/kg' ? 'kg' : 'lbs'})</IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBMI && <BmiResult result={calculatedBMI} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
