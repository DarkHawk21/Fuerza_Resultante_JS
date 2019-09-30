(function(){
    //Los botones de funcionamiento del programa.
    const btnPendiente = document.getElementById("btnPendiente");
    const btnAngulo = document.getElementById("btnAngulo");
    const titlenFuerzas = document.getElementById("titlenFuerzas");
    const btnHome = document.getElementById("btnHome");

    //Las variables generales del sitio.
    let formulasX = "Ex = ", formulasY = "Ey = ", valoresX = "", valoresY = "";
    let ex = 0; ey = 0, mgResultante = 0, a = 0, b = 0, c = 0, valores = new Array();
    let momentosValores = "EMoF = ", momentosTOTAL = 0;

    btnPendiente.addEventListener("click", () => {
        clear();
        let nFuerzas = prompt("¿Cuántas fuerzas desea calcular?", "2");
        
        if (nFuerzas != "") {
            titlenFuerzas.innerText = "Calculando la suma de " + nFuerzas + " fuerzas";

            setTimeout(() => {
                for (let i = 0; i < nFuerzas; i++) {
                    let i1 = i + 1;

                    valores[i] = [parseFloat(prompt("Magnitud de la fuerza " + i1)), parseFloat(prompt("Valor para \"a\" de F" + i1)), parseFloat(prompt("Valor para \"b\" de F" + i1))];

                    a = valores[i][1];
                    b = valores[i][2];
                    valores[i][3] = Math.round((Math.sqrt((a * a) + (b * b)))*100) / 100;
                    c = valores[i][3];
                    fuerza = valores[i][0];
                    valores[i][4] = fuerza * (b / c); //Valor de b entre c para cada fuerza
                    valores[i][5] = fuerza * (a / c); //Valor de a entre c para cada fuerza

                    if (i < nFuerzas - 1) {
                        formulasX += "F" + i1 + "(b" + i1 + "/c" + i1 + ") + ";
                        formulasY += "F" + i1 + "(a" + i1 + "/c" + i1 + ") + ";
                        valoresX += fuerza + "(" + b + "/" + c + ") + ";
                        valoresY += fuerza + "(" + a + "/" + c + ") + ";
                    } else {
                        formulasX += "F" + i1 + "(b" + i1 + "/c" + i1 + ")";
                        formulasY += "F" + i1 + "(a" + i1 + "/c" + i1 + ")";
                        valoresX += fuerza + "(" + b + "/" + c + ")";
                        valoresY += fuerza + "(" + a + "/" + c + ")";
                    }

                    //Magnitudes resultantes de las sumas de las componentes de cada fuerza en X e Y
                    ex += valores[i][4];
                    ey += valores[i][5];
                }

                //Magnitud de la fuerza resultante
                mgResultante = Math.round((Math.sqrt((ex * ex) + (ey * ey))) * 100) / 100;
                cuadrante(ex, ey);

                for (let i = 0; i < nFuerzas; i++) {
                    valores[i][6] = parseFloat(prompt("Indique el valor de la distancia para F" + (i + 1) + " en X"));
                    valores[i][7] = parseFloat(prompt("Indique el valor de la distancia para F" + (i + 1) + " en Y"));

                    if (i < nFuerzas-1) {
                        momentosValores += "(" + valores[i][4] + ")(" + valores[i][6] + ") + (" + valores[i][5] + ")(" + valores[i][7] + ") +";
                        momentosTOTAL += (valores[i][4] * valores[i][6]) + (valores[i][5] * valores[i][7]);
                    } else {
                        momentosValores += "(" + valores[i][4] + ")(" + valores[i][6] + ") + (" + valores[i][5] + ")(" + valores[i][7] + ")";
                        momentosTOTAL += (valores[i][4] * valores[i][6]) + (valores[i][5] * valores[i][7]);
                    }
                }

                //Calculando el momento total
                let momento = Math.round((momentosTOTAL / ey) * 100) / 100;

                //Resultante total
                document.getElementById("procedimientoFormulas").innerHTML = "<h3>Fórmulas</h3>" + formulasX + "<br>" + formulasY;
                document.getElementById("procedimientoValores").innerHTML = "<br><h3>Procedimiento</h3>" + valoresX + "<br>" + valoresY + "<br><br><h4>Calculando momentos...</h4>" + momentosValores;
                document.getElementById("resultados").innerHTML = "<br><h3>Resultados</h3> Ex = " + ex + " <br>Ey = " + ey + "<br>R = " + mgResultante + ", " + cuadrante(ex, ey) + "°<br>Xo = " + momento + " m";
            }, 500);   
        } else {
            titlenFuerzas.innerText = "No introdujo un valor.";
        }
    });

    btnAngulo.addEventListener("click", () => {
        clear();
        let nFuerzas = prompt("¿Cuántas fuerzas desea calcular?", "2");

        if (nFuerzas != "") {
            titlenFuerzas.innerText = "Calculando la suma de " + nFuerzas + " fuerzas";

            setTimeout(() => {
                for (let i = 0; i < nFuerzas; i++) {
                    let i1 = i + 1;

                    valores[i] = [parseFloat(prompt("Magnitud de la fuerza " + i1)), parseFloat(prompt("Ángulo con respecto a la horizontal de F" + i1 + " en grados"))];

                    fuerza = valores[i][0];
                    valores[i][2] = (valores[i][1] * Math.PI) / 180; //Angulo en radianes
                    anguloR = valores[i][2]; //Angulo en radianes
                    valores[i][3] = fuerza * (Math.cos(anguloR)); //Valor de componente en X de cada fuerza en radianes
                    valores[i][4] = fuerza * (Math.sin(anguloR)); //Valor de componente en Y de cada fuerza en radianes

                    if (i < nFuerzas - 1) {
                        formulasX += "F" + i1 + "cos(a" + i1 + ") + ";
                        formulasY += "F" + i1 + "sen(a" + i1 + ") + ";
                        valoresX += fuerza + "cos(" + anguloR + ") + ";
                        valoresY += fuerza + "sen(" + anguloR + ") + ";
                    } else {
                        formulasX += "F" + i1 + "cos(a" + i1 + ")";
                        formulasY += "F" + i1 + "sen(a" + i1 + ")";
                        valoresX += fuerza + "cos(" + anguloR + ")";
                        valoresY += fuerza + "sen(" + anguloR + ")";
                    }

                    //Magnitudes resultantes de las sumas de las componentes de cada fuerza en X e Y
                    ex += valores[i][3];
                    ey += valores[i][4];
                }

                //Magnitud de la fuerza resultante
                mgResultante = Math.round((Math.sqrt((ex * ex) + (ey * ey))) * 100) / 100;
                cuadrante(ex, ey);

                for (let i = 0; i < nFuerzas; i++) {
                    valores[i][5] = parseFloat(prompt("Indique el valor de la distancia para F" + (i + 1) + " en X"));
                    valores[i][6] = parseFloat(prompt("Indique el valor de la distancia para F" + (i + 1) + " en Y"));

                    if (i < nFuerzas - 1) {
                        momentosValores += "(" + valores[i][3] + ")(" + valores[i][6] + ") + (" + valores[i][4] + ")(" + valores[i][5] + ") +";
                        momentosTOTAL += (valores[i][3] * valores[i][6]) + (valores[i][4] * valores[i][5]);
                    } else {
                        momentosValores += "(" + valores[i][3] + ")(" + valores[i][6] + ") + (" + valores[i][4] + ")(" + valores[i][5] + ")";
                        momentosTOTAL += (valores[i][3] * valores[i][6]) + (valores[i][4] * valores[i][5]);
                    }
                }

                //Calculando el momento total
                let momento = Math.round((momentosTOTAL / ey) * 100) / 100;

                //Resultante total
                console.log("R = " + mgResultante + ", " + cuadrante(ex, ey) + "°");
                console.log("Xo = " + momento + " m");
                document.getElementById("procedimientoFormulas").innerHTML = "<h3>Fórmulas</h3>" + formulasX + "<br>" + formulasY;
                document.getElementById("procedimientoValores").innerHTML = "<br><h3>Procedimiento</h3>" + valoresX + "<br>" + valoresY + "<br><br><h4>Calculando momentos...</h4>" + momentosValores;
                document.getElementById("resultados").innerHTML = "<br><h3>Resultados</h3> Ex = " + ex + " <br>Ey = " + ey + "<br>R = " + mgResultante + ", " + cuadrante(ex, ey) + "°<br>Xo = " + momento + " m";
            }, 500);
        } else {
            titlenFuerzas.innerText = "No introdujo un valor.";
        }
    });

    btnHome.addEventListener("click", () => {
        clear();
        location.reload();
    });

    function clear() {
        formulasX = "Ex = ";
        formulasY = "Ey = ";
        valoresX = "";
        valoresY = "";
        ex = 0;
        ey = 0;
        mgResultante = 0;
        a = 0;
        b = 0;
        c = 0;
        momentosValores = "EMoF = ";
        momentosTOTAL = 0;
        valores = new Array();
        removeContent();
        console.clear();
        console.log("Se han reiniciado las variables del sistema...");
    }
}());

function removeContent() {
    document.getElementById("procedimientoFormulas").innerHTML = "";
    document.getElementById("procedimientoValores").innerHTML = "";
}

function cuadrante(ex, ey) {
    let tetaResultante = 0;

    if (ex != 0) {
        //Dirección de la fuerza resultante en radianes
        tetaResultante = Math.atan(Math.abs(ey) / Math.abs(ex));

        //Dirección de la fuerza resultante en grados
        tetaResultante = Math.round(((tetaResultante * 180) / Math.PI) * 100) / 100;

        if (ex > 0 && ey > 0) {
            console.log("Primer Cuadrante");
        } else if (ex < 0 && ey > 0) {
            tetaResultante = 180 - tetaResultante;
            console.log("Segundo cuadrante");
        } else if (ex < 0 && ey < 0) {
            tetaResultante += 180;
            console.log("Tercer cuadrante");
        } else if (ex > 0 && ey < 0) {
            tetaResultante = 360 - tetaResultante;
            console.log("Cuarto cuadrante");
        }
    } else {
        if (ex == 0 && ey > 0) {
            tetaResultante = 90;
        } else if (ex == 0 && ey < 0) {
            tetaResultante = 270;
        } else if (ey == 0 && ex > 0) {
            tetaResultante = 0;
        } else if (ey == 0 && ex < 0) {
            tetaResultante = 180;
        }
    }

    return tetaResultante;
};