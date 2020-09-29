import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const InputControls: React.FC<{ 
    selectedValue: "m/kg" | "ft/lbs"; 
    onSelectValue: (value: "m/kg" | "ft/lbs") => void; }> = (
  props
) => {

   const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value)
    }

  return (
    <IonSegment
      value={props.selectedValue}
      onIonChange={inputChangeHandler}>
      <IonSegmentButton value="m/kg">
        <IonLabel>m/Kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ft/lbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControls;
