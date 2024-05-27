import { View,StyleSheet, Image, TouchableOpacity,Text } from 'react-native';

const CurdStudent = ({navigation}) => {
    return (
      <View style={Dashboardstyles.container}>
       
       <View style={Dashboardstyles.dashboardContainer}>
          <Text style={Dashboardstyles.dashboardTitle}>Fee Operations</Text>

          <View style={Dashboardstyles.buttonsRow}>
            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton} onPress={()=>{navigation.navigate('AdminClassScreen')}}>
                  <Image source={require('../../public/icons/student.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Edit Fee</Text>
            </View>

            <View style={Dashboardstyles.IconContainer}>
                <TouchableOpacity style={Dashboardstyles.dashboardButton}  onPress={()=>{navigation.navigate('deletefeeStatus')}}>
                  <Image source={require('../../public/icons/marks.png')} style={Dashboardstyles.image} />
                </TouchableOpacity>
                <Text style={Dashboardstyles.buttonText}>Fee Status</Text>
            </View>


          </View>

        </View>
        <TouchableOpacity style={Dashboardstyles.backButton} onPress={()=>{navigation.navigate('adminDashboard')}}>
                  <Text style={Dashboardstyles.backText}>Back to Dashboard </Text>
        </TouchableOpacity>

      </View>
    );
  };

  const Dashboardstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8F4FF',
    },
    image:{
      height: 40,
      width: 40,
      resizeMode: 'contain'
    },
    IconContainer:{
        width: '40%',
        height: '100%',
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent : 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    backButton:{
      backgroundColor: '#58B1F4',
      borderRadius  : 10,
      height: 40,
      width: '50%',
      marginTop: 20,
      marginBottom: 60,
      alignSelf: 'center',
      justifyContent : 'center',
      alignItems: 'center',
      justifyContent: 'center',

    },
    dashboardContainer: {
      flex: 1,
      padding: 20,
    },
    dashboardTitle: {
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonsRow: {
      width: '100%',
      height: '20%',
    },
    dashboardButton: {
      backgroundColor: '#58B1F4',
      borderRadius: 10,
      width: '60%',
      height: '65%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonText: {
      fontSize: 15,
    },
    backText: {
      color: '#fff',
      fontSize: 15,
    },
  });

export default CurdStudent;