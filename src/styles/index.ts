import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
  },
  containerFlex2: {
    flex: 2,
  },
  textInputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  padding5AlignC: {
    padding: 5,
    alignItems: 'center',
  },
  displayFlexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  displayFlexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  displayFlexWrapRow: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  hourlyItem: {
    margin: 5,
    gap: 10,
    justifyContent: 'center',
  },
  marginVertical5: {
    marginVertical: 5,
  },
  marginHorizonatl5: {
    marginHorizontal: 5,
  },
  paddingHorizonatl15: {
    paddingHorizontal: 15,
  },
  paddingHorizonatl10: {
    paddingHorizontal: 10,
  },
  paddingVertical15: {
    paddingVertical: 15,
  },
  paddingVertical10: {
    paddingVertical: 10,
  },
  paddingVertical5: {
    paddingVertical: 5,
  },
  gap10: {
    gap: 10,
  },
  gap5: {
    gap: 5,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  flexDRow: {
    flexDirection: 'row',
  },
  borderRadius5: {
    borderRadius: 5,
  },
  width100: {
    width: '100%',
  },
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  //capsule
  capsuleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    position: 'relative', // To position text absolutely if needed
  },
  backgroundCapsule: {
    backgroundColor: 'white',
  },
  capsuleFilled: {
    backgroundColor: 'orange',
    position: 'absolute', // Ensure it sits at the top of the background
    bottom: 0, // Align to the bottom of the background
  },
  //card
  cardStyle: {
    width: '100%',
    gap: 5,
    borderRadius: 5,
    padding: 10,
    flexBasis: '50%',
    aspectRatio: 1,
  },
});
