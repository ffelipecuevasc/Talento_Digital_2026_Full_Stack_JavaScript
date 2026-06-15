// 1. Solicitar al usuario el diámetro del círculo
let diametro = prompt("Por favor, ingresa el diámetro del círculo:");

// Convertir el valor ingresado a un número
diametro = parseFloat(diametro);

// Validar que el usuario haya ingresado un número válido mayor a 0
if (!isNaN(diametro) && diametro > 0) {

    // 2. Calcular el radio como la mitad del diámetro
    let radio = diametro / 2;

    // 3. Obtener el área utilizando Math.PI y Math.pow(radio, 2)
    let area = Math.PI * Math.pow(radio, 2);

    // Preparar el mensaje con el resultado (redondeado a 2 decimales para mayor legibilidad)
    let mensaje = "El área del círculo con diámetro " + diametro + " es: " + area.toFixed(2);

    // 4. Mostrar el resultado en la consola
    console.log(mensaje);

    // 5. Mostrar el resultado en una ventana emergente
    window.alert(mensaje);

    // 6. Mostrar el resultado en la página web
    document.getElementById("resultado").innerHTML = mensaje;

} else {
    // Manejo de errores por si el usuario ingresa texto o cancela
    let error = "Por favor, recarga la página e ingresa un número de diámetro válido.";
    console.log(error);
    window.alert(error);
    document.getElementById("resultado").innerHTML = error;
}