import { Share } from "react-native";

export const shareString = async (text: string) => {
  try {
    const result = await Share.share({
      title: "Share Shukran",
      message: text,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared via an activity
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    console.error("Error sharing link:", error);
  }
};
