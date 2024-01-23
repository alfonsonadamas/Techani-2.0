import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import techaniLogo from "../assets/img/Techani (1).png";

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 70,
    paddingVertical: 30,
  },
  image: {
    width: 90,
    height: 90,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4DBDEB",
  },
  margenTexto: {
    marginLeft: 15,
  },
  textoTitulo: {
    fontSize: "18",
    fontWeight: "thin",
    marginBottom: 5,
    fontFamily: "Helvetica-Bold",
  },
  textoHeader: {
    fontSize: "12",
    marginBottom: 5,
    fontFamily: "Helvetica-Bold",
  },
  datosHeader: {
    fontFamily: "Helvetica-Bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textoDatos: {
    fontSize: "12",
    textAlign: "justify",
    marginBottom: 5,
    marginTop: 10,
  },
  textoMediciones: {
    fontSize: "12",
    textAlign: "justify",
    marginBottom: 40,
    marginTop: 40,
    fontFamily: "Helvetica-Bold",
  },
  imagenFooter: {
    width: 40,
    height: 40,
  },
  divFooter: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 200,
  },
  textoFooter: {
    fontSize: "8",
    fontFamily: "Helvetica-Bold",
  },
});

export default function PdfGlucose({ datos }) {
  const {
    glucose,
    dose,
    insulineType,
    doseType,
    water,
    atipicDay,
    observation,
    created_at,
    user,
  } = datos;
  console.log(glucose);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.image} src={techaniLogo}></Image>
          <View style={styles.margenTexto}>
            <Text style={styles.textoTitulo}>TECHANI</Text>
            <Text style={styles.textoHeader}>
              REGISTRO DIARIO DE GLUCOSA EN SANGRE
            </Text>
            <View style={styles.datosHeader}>
              <Text style={styles.textoHeader}>{user}</Text>
              <Text style={styles.textoHeader}>{created_at}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.textoDatos}>
            El documento presenta un registro diario de la glucosa en sangre,
            esencial para el control de la diabetes. Este informe facilita la
            toma de decisiones informadas junto a profesionales de la salud,
            contribuyendo al manejo efectivo de la diabetes y mejorando la
            calidad de vida.
          </Text>
          <Text style={styles.textoDatos}>
            Con fecha de {created_at} se registraron los siguientes datos:
          </Text>
          <Text style={styles.textoMediciones}>
            Los niveles de glucosa en sangre registrados indican un rango
            promedio de {glucose} mg/dL. Se utilizó la insulina {insulineType}{" "}
            con una dosis de {dose} unidades. Las medición que se realizó fue{" "}
            {doseType}.{" "}
            {atipicDay === "Ninguno"
              ? "No tuvo un día atípico"
              : `Las mediciones se pueden ver afectadas por el siguiente
            dia atipico: {atipicDay}`}
            . Se registró una ingesta de
            {water} {water === 1 ? "vaso" : "vasos"} de agua como parte integral
            del control. Cualquier observación adicional señalada incluye:{" "}
            {observation !== "" ? `{observation}` : "Ninguna"}.
          </Text>
          <Text style={styles.textoDatos}>
            Este análisis detallado del registro diario de glucosa en sangre se
            presenta como una herramienta esencial para el control de la
            diabetes. Invitamos a compartir este informe con su médico,
            facilitando la identificación de patrones y ajustes precisos en el
            tratamiento.
          </Text>
        </View>
        <View style={styles.divFooter}>
          <Image style={styles.imagenFooter} src={techaniLogo}></Image>
          <Text style={styles.textoFooter}>La salud en tus manos</Text>
        </View>
      </Page>
    </Document>
  );
}
