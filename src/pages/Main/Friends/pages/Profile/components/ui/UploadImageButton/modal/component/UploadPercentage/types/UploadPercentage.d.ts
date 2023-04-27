type ProgressState = "idle" | "error" | "success" | "pending";

interface UploadPercentageProps {
  percentage?: number;
  type?: ProgressState;
}

interface UploadPercentageIconProps {
  type: ProgressState;
}
