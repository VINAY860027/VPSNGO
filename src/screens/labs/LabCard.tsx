import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_BASE_URL } from '../../../apiConfig';

export interface Lab {
  id: number;
  title: string;
  subject: string;
  lab_type: string;
  description: string;
  access_url: string | null;
  file_path: string | null;
  cover_image_url?: string | null;
}

interface LabCardProps {
  lab: Lab;
  onEdit?: (lab: Lab) => void;
  onDelete?: (id: number) => void;
}

export const LabCard = ({ lab, onEdit, onDelete }: LabCardProps) => {
  const canManage = onEdit && onDelete;

  // ✅ Separate handler for opening the external link
  const handleOpenLink = async () => {
    if (!lab.access_url) return;
    try {
        const supported = await Linking.canOpenURL(lab.access_url);
        if (supported) {
          await Linking.openURL(lab.access_url);
        } else {
          Alert.alert("Error", `Cannot open this URL: ${lab.access_url}`);
        }
    } catch (error) {
        Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  // ✅ Separate handler for opening the uploaded file
  const handleOpenFile = async () => {
    if (!lab.file_path) return;
    const fileUrl = `${API_BASE_URL}${lab.file_path}`;
    try {
        const supported = await Linking.canOpenURL(fileUrl);
        if (supported) {
          await Linking.openURL(fileUrl);
        } else {
          Alert.alert("Error", `Cannot open this file: ${fileUrl}`);
        }
    } catch (error) {
        Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const imageSource = lab.cover_image_url 
    ? { uri: `${API_BASE_URL}${lab.cover_image_url}` }
    : require('../../assets/default-lab-icon.png');

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <Image source={imageSource} style={styles.iconImage} />
          </View>
          <Text style={styles.title}>{lab.title}</Text>
        </View>
        {canManage && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => onEdit(lab)} style={[styles.actionBtn, styles.editBtn]}>
              <MaterialIcons name="edit" size={16} color="#333" />
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(lab.id)} style={[styles.actionBtn, styles.deleteBtn]}>
              <MaterialIcons name="delete" size={16} color="#fff" />
              <Text style={styles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.subtitle}>Subject: {lab.subject} | Type: {lab.lab_type}</Text>
      <Text style={styles.description}>{lab.description}</Text>

      {/* ✅ --- SMART BUTTON RENDERING LOGIC --- */}
      <View style={styles.accessButtonsContainer}>
        {/* Button 1: Only shows if a file_path exists */}
        {lab.file_path && (
          <TouchableOpacity style={[styles.accessButton, styles.fileButton]} onPress={handleOpenFile}>
            <MaterialIcons name="file-download" size={20} color="#fff" />
            <Text style={styles.accessButtonText}>Download File</Text>
          </TouchableOpacity>
        )}
        
        {/* Button 2: Only shows if an access_url exists */}
        {lab.access_url && (
          <TouchableOpacity style={[styles.accessButton, styles.linkButton]} onPress={handleOpenLink}>
            <MaterialIcons name="launch" size={20} color="#fff" />
            <Text style={styles.accessButtonText}>Access Link</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    actionBtnText: {
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 14,
    },
    editBtn: { backgroundColor: '#f0ad4e' },
    editBtnText: { color: '#333' },
    deleteBtn: { backgroundColor: '#d9534f' },
    deleteBtnText: { color: '#fff' },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0f7fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    iconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#263238',
        flexShrink: 1,
    },
    subtitle: {
        fontSize: 14,
        color: '#546e7a',
        marginBottom: 12,
        fontStyle: 'italic',
    },
    description: {
        fontSize: 15,
        color: '#455a64',
        lineHeight: 22,
        marginBottom: 20,
    },
    // ✅ --- NEW AND UPDATED STYLES FOR ACCESS BUTTONS ---
    accessButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows buttons to wrap on small screens if needed
        gap: 10, // Space between buttons
    },
    accessButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        flexGrow: 1, // Allows buttons to share space
    },
    fileButton: {
        backgroundColor: '#5cb85c', // Green for files
    },
    linkButton: {
        backgroundColor: '#009688', // Teal for links
    },
    accessButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});