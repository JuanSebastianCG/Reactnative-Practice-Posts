import React from 'react';
import { View, Text, Linking, StyleSheet,TouchableOpacity } from 'react-native';

const goBack = () => navigation.navigate("RegisterScreen");

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Política de Privacidad</Text>
      <Text style={styles.updated}>Última actualización: 06 de noviembre de 2023</Text>
      <Text style={styles.paragraph}>
        Esta Política de Privacidad describe nuestras políticas y procedimientos sobre la recopilación, el uso y la divulgación de su información cuando utiliza el servicio y le informa sobre sus derechos de privacidad y cómo la ley lo protege.
      </Text>
      <Text style={styles.paragraph}>
        Utilizamos sus datos personales para proporcionar y mejorar el servicio. Al utilizar el servicio, usted acepta la recopilación y el uso de información de acuerdo con esta Política de Privacidad. Esta Política de Privacidad ha sido creada con la ayuda del{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.privacypolicies.com/privacy-policy-generator/')}>
          Generador de Política de Privacidad
        </Text>
        .
      </Text>
      <Text style={styles.subheading}>Interpretación y Definiciones</Text>
      <Text style={styles.subheading}>Interpretación</Text>
      <Text style={styles.paragraph}>
        Las palabras cuya letra inicial está en mayúscula tienen significados definidos en las siguientes condiciones. Las siguientes definiciones tendrán el mismo significado sin importar si aparecen en singular o en plural.
      </Text>
      <Text style={styles.subheading}>Definiciones</Text>
      <Text style={styles.paragraph}>Para los fines de esta Política de Privacidad:</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Cuenta</Text> significa una cuenta única creada para que usted acceda a nuestro Servicio o partes de nuestro Servicio.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Afiliado</Text> significa una entidad que controla, es controlada por o está bajo control común con una parte, donde "control" significa propiedad del 50% o más de las acciones, intereses de capital u otros valores con derecho a voto para la elección de directores u otra autoridad de gestión.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Aplicación</Text> se refiere a Apis, el programa de software proporcionado por la Compañía.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Compañía</Text> (referida como "la Compañía", "Nosotros", "Nos" o "Nuestra" en este Acuerdo) se refiere a DispositivosMóviles, Calle 69 #9A-85.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>País</Text> se refiere a: Colombia
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Dispositivo</Text> significa cualquier dispositivo que puede acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Datos personales</Text> es cualquier información que se refiere a un individuo identificado o identificable.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Servicio</Text> se refiere a la Aplicación.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Proveedor de servicios</Text> significa cualquier persona natural o jurídica que procesa los datos en nombre de la Compañía. Se refiere a empresas o individuos de terceros empleados por la Compañía para facilitar el Servicio, para proporcionar el Servicio en nombre de la Compañía, para realizar servicios relacionados con el Servicio o para ayudar a la Compañía en el análisis de cómo se utiliza el Servicio.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Datos de uso</Text> se refiere a datos recopilados automáticamente, generados por el uso del Servicio o por la propia infraestructura del Servicio (por ejemplo, la duración de una visita a una página).
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Usted</Text> significa el individuo que accede o utiliza el Servicio, o la empresa u otra entidad legal en nombre de la cual dicho individuo accede o utiliza el Servicio, según corresponda.
      </Text>
      <Text style={styles.subheading}>Recopilación y uso de sus datos personales</Text>
      <Text style={styles.subheading}>Tipos de datos recopilados</Text>
      <Text style={styles.subheading}>Datos personales</Text>
      <Text style={styles.paragraph}>
        Mientras utiliza nuestro Servicio, es posible que le pidamos que nos proporcione cierta información personalmente identificable que se pueda utilizar para ponerse en contacto o identificarle. La información personalmente identificable puede incluir, pero no se limita a:
      </Text>
      <Text style={styles.listItem}>Dirección de correo electrónico</Text>
      <Text style={styles.listItem}>Nombre y apellido</Text>
      <Text style={styles.listItem}>Datos de uso</Text>
      <Text style={styles.subheading}>Datos de uso</Text>
      <Text style={styles.paragraph}>Los datos de uso se recopilan automáticamente al utilizar el Servicio.</Text>
      <Text style={styles.paragraph}>
        Los datos de uso pueden incluir información como la dirección de Protocolo de Internet de su Dispositivo (por ejemplo, dirección IP), tipo de navegador, versión del navegador, las páginas de nuestro Servicio que visita, la hora y fecha de su visita, el tiempo que pasa en esas páginas, identificadores únicos de dispositivos y otros datos de diagnóstico.
      </Text>
      <Text style={styles.subheading}>Información recopilada mientras se utiliza la Aplicación</Text>
        <Text style={styles.paragraph}>
        Mientras utiliza nuestra Aplicación, con el fin de proporcionar características de nuestra Aplicación, podemos recopilar, con su permiso previo:
        </Text>
        <Text style={styles.listItem}>
        Imágenes y otra información de la cámara y la biblioteca de fotos de su Dispositivo
        </Text>
        <Text style={styles.paragraph}>
        Utilizamos esta información para proporcionar características de nuestro Servicio, mejorar y personalizar nuestro Servicio. La información puede cargarse en los servidores de la Compañía y/o en el servidor de un Proveedor de Servicios o simplemente almacenarse en su dispositivo.
        </Text>
        <Text style={styles.paragraph}>
        Puede habilitar o deshabilitar el acceso a esta información en cualquier momento a través de la configuración de su Dispositivo.
        </Text>
        <Text style={styles.subheading}>Uso de sus datos personales</Text>
        <Text style={styles.paragraph}>
        La Compañía puede utilizar los Datos Personales para los siguientes fines:
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para proporcionar y mantener nuestro Servicio</Text>, incluida la supervisión del uso de nuestro Servicio.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para gestionar su cuenta:</Text> para gestionar su registro como usuario del Servicio. Los Datos Personales que proporciona pueden darle acceso a diferentes funcionalidades del Servicio que están disponibles para usted como usuario registrado.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para el cumplimiento de un contrato:</Text> el desarrollo, cumplimiento y realización del contrato de compra de los productos, artículos o servicios que haya adquirido o de cualquier otro contrato con nosotros a través del Servicio.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para contactarle:</Text> para contactarle por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica, como notificaciones push de aplicaciones móviles sobre actualizaciones o comunicaciones informativas relacionadas con las funcionalidades, productos o servicios, incluyendo actualizaciones de seguridad, cuando sea necesario o razonable para su implementación.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para proporcionarle</Text> noticias, ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos y que son similares a los que ya ha adquirido o sobre los que ha preguntado, a menos que haya optado por no recibir dicha información.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para gestionar sus solicitudes:</Text> para atender y gestionar sus solicitudes hacia nosotros.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para transferencias comerciales:</Text> podemos utilizar su información para evaluar o llevar a cabo una fusión, venta de activos de la Compañía, financiación o adquisición de la totalidad o una parte de nuestro negocio por otra empresa, ya sea como empresa en funcionamiento o como parte de un proceso de quiebra, liquidación u otro procedimiento similar, en el que los Datos Personales mantenidos por nosotros sobre los usuarios de nuestro Servicio sean uno de los activos transferidos.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para otros fines:</Text> podemos utilizar su información para otros fines, como análisis de datos, identificación de tendencias de uso, determinación de la eficacia de nuestras campañas promocionales y para evaluar y mejorar nuestro Servicio, productos, servicios, marketing y su experiencia.
        </Text>
        <Text style={styles.paragraph}>
        Podemos compartir su información personal en las siguientes situaciones:
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Con proveedores de servicios:</Text> podemos compartir su información personal con proveedores de servicios para supervisar y analizar el uso de nuestro Servicio, así como para ponerse en contacto con usted.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Para transferencias comerciales:</Text> podemos compartir o transferir su información personal en relación con, o durante las negociaciones de, cualquier fusión, venta de activos de la Compañía, financiación o adquisición de todo o parte de nuestro negocio por otra empresa.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Con Afiliados:</Text> podemos compartir su información con nuestras filiales, en cuyo caso requeriremos que esas filiales respeten esta Política de Privacidad. Las filiales incluyen nuestra empresa matriz y cualquier otra subsidiaria, socios de empresas conjuntas u otras empresas que controlamos o que están bajo control común con nosotros.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Con socios comerciales:</Text> podemos compartir su información con nuestros socios comerciales para ofrecerle ciertos productos, servicios o promociones.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Con otros usuarios:</Text> cuando comparta información personal o interactúe en las áreas públicas con otros usuarios, esa información puede ser vista por todos los usuarios y puede distribuirse públicamente.
        </Text>
        <Text style={styles.listItem}>
        <Text style={styles.bold}>Con su consentimiento:</Text> podemos divulgar su información personal con su consentimiento para cualquier otro propósito.
        </Text>
        <Text style={styles.subheading}>Conservación de sus Datos Personales</Text>
        <Text style={styles.paragraph}>
        La Compañía conservará sus Datos Personales solamente durante el tiempo que sea necesario para los fines establecidos en esta Política de Privacidad. Conservaremos y utilizaremos sus Datos Personales en la medida en que sea necesario para cumplir con nuestras obligaciones legales (por ejemplo, si se requiere conservar sus datos para cumplir con las leyes aplicables), resolver disputas y hacer cumplir nuestros acuerdos legales y políticas.
        </Text>
        <Text style={styles.paragraph}>
        También conservaremos los Datos de Uso con fines de análisis interno. Los Datos de Uso se conservan generalmente por un período de tiempo más corto, excepto cuando estos datos se utilizan para fortalecer la seguridad o mejorar la funcionalidad de nuestro Servicio, o cuando estamos legalmente obligados a conservar estos datos durante períodos de tiempo más largos.
        </Text>
        <Text style={styles.subheading}>Transferencia de sus Datos Personales</Text>
        <Text style={styles.paragraph}>
        Su información, incluidos los Datos Personales, se procesa en las oficinas operativas de la Compañía y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Esto significa que esta información puede transferirse a, y mantenerse en, computadoras ubicadas fuera de su estado, provincia, país u otra jurisdicción gubernamental, donde las leyes de protección de datos pueden ser diferentes a las de su jurisdicción.
        </Text>
        <Text style={styles.paragraph}>
        Su consentimiento a esta Política de Privacidad seguido de su envío de tal información representa su acuerdo con esa transferencia.
        </Text>
        <Text style={styles.paragraph}>
        La Compañía tomará todas las medidas razonablemente necesarias para asegurarse de que sus datos sean tratados de forma segura y de acuerdo con esta Política de Privacidad, y no se realizará ninguna transferencia de sus Datos Personales a una organización o país a menos que existan controles adecuados, incluyendo la seguridad de sus datos y otra información personal.
        </Text>
        <Text style={styles.subheading}>Eliminar sus Datos Personales</Text>
        <Text style={styles.paragraph}>
        Tiene derecho a eliminar o solicitar que le ayudemos a eliminar los Datos Personales que hemos recopilado sobre usted.
        </Text>
        <Text style={styles.paragraph}>
        Nuestro Servicio puede brindarle la capacidad de eliminar cierta información sobre usted desde dentro del Servicio.
        </Text>
        <Text style={styles.paragraph}>
        Puede actualizar, modificar o eliminar su información en cualquier momento iniciando sesión en su cuenta, si la tiene, y visitando la sección de configuración de la cuenta que le permite administrar su información personal. También puede contactarnos para solicitar acceso, corrección o eliminación de cualquier información personal que nos haya proporcionado.
        </Text>
        <Text style={styles.paragraph}>
        Sin embargo, tenga en cuenta que es posible que debamos retener cierta información cuando tengamos una obligación legal o base legal para hacerlo.
        </Text>
        <Text style={styles.subheading}>Divulgación de sus Datos Personales</Text>
        <Text style={styles.paragraph}>
        <Text style={styles.bold}>Transacciones comerciales:</Text> Si la Compañía está involucrada en una fusión, adquisición o venta de activos, sus Datos Personales pueden ser transferidos. Proporcionaremos un aviso antes de que sus Datos Personales sean transferidos y queden sujetos a una Política de Privacidad diferente.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.bold}>Aplicación de la ley:</Text> En circunstancias específicas, la Compañía puede estar obligada a divulgar sus Datos Personales si así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.bold}>Otros requisitos legales:</Text> La Compañía puede divulgar sus Datos Personales de buena fe cuando considere que dicha acción es necesaria para:
        </Text>
        <Text style={styles.listItem}>
        Cumplir con una obligación legal
        </Text>
        <Text style={styles.listItem}>
        Proteger y defender los derechos o propiedades de la Compañía
        </Text>
        <Text style={styles.listItem}>
        Prevenir o investigar posibles infracciones relacionadas con el Servicio
        </Text>
        <Text style={styles.listItem}>
        Proteger la seguridad personal de los usuarios del Servicio o del público en general
        </Text>
        <Text style={styles.listItem}>
        Proteger contra la responsabilidad legal
        </Text>
        <Text style={styles.subheading}>Seguridad de sus Datos Personales</Text>
        <Text style={styles.paragraph}>
        La seguridad de sus Datos Personales es importante para nosotros, pero recuerde que ningún método de transmisión por Internet o de almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por utilizar medios comercialmente aceptables para proteger sus Datos Personales, no podemos garantizar su seguridad absoluta.
        </Text>
        <Text style={styles.subheading}>Privacidad de los niños</Text>
        <Text style={styles.paragraph}>
        Nuestro Servicio no está dirigido a personas menores de 13 años. No recopilamos de manera consciente información de identificación personal de personas menores de 13 años. Si usted es padre o tutor y sabe que su hijo nos ha proporcionado Datos Personales, comuníquese con nosotros. Si nos damos cuenta de que hemos recopilado Datos Personales de personas menores de 13 años sin la verificación del consentimiento de los padres, tomaremos medidas para eliminar esa información de nuestros servidores.
        </Text>
        <Text style={styles.paragraph}>
        Si necesitamos basar el procesamiento de su información en el consentimiento como base legal y su país requiere el consentimiento de un padre, podemos requerir el consentimiento de sus padres antes de recopilar y utilizar esa información.
        </Text>
        <Text style={styles.subheading}>Enlaces a otros sitios web</Text>
        <Text style={styles.paragraph}>
        Nuestro Servicio puede contener enlaces a otros sitios web que no son operados por nosotros. Si hace clic en un enlace de un tercero, será dirigido al sitio de ese tercero. Le recomendamos encarecidamente que revise la Política de Privacidad de cada sitio que visite.
        </Text>
        <Text style={styles.paragraph}>
        No tenemos control sobre y no asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o prácticas de sitios o servicios de terceros.
        </Text>
        <Text style={styles.subheading}>Cambios en esta Política de Privacidad</Text>
        <Text style={styles.paragraph}>
        Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.
        </Text>
        <Text style={styles.paragraph}>
        Le informaremos por correo electrónico y/o mediante un aviso destacado en nuestro Servicio antes de que el cambio entre en vigencia y actualizaremos la fecha de "Última actualización" en la parte superior de esta Política de Privacidad.
        </Text>
        <Text style={styles.paragraph}>
        Se recomienda que revise periódicamente esta Política de Privacidad para cualquier cambio. Los cambios a esta Política de Privacidad son efectivos cuando se publican en esta página.
        </Text>
        <Text style={styles.subheading}>Contáctenos</Text>
        <Text style={styles.paragraph}>
        Si tiene alguna pregunta sobre esta Política de Privacidad, puede ponerse en contacto con nosotros:
        </Text>
        <Text style={styles.listItem}>
        Por correo electrónico: cristiand.santap@autonoma.edu.co
        </Text>
        <Text style={styles.listItem}>
        Por número de teléfono: 3183603995
        </Text>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={goBack}>Botón</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  updated: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 15,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  listItem: {
    fontSize: 14,
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PrivacyPolicy;
