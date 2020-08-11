import React from "react";
import { Link, Route } from "react-router-dom";

export function Personlistmaker(props) {
  let patient_list = [];
  for (let j = 0; j < props.name_list.length; j++) {
    patient_list.push(
      <Link
        to={`/vitals/${props.id_list[j]}`}
        params={{ id: props.id_list[j] }}
        className="vitalslink"
        key={props.id_list[j]}
      >
        <span>{props.name_list[j]}</span>
      </Link>
    );
  }

  console.log(patient_list);
  return patient_list;
}
