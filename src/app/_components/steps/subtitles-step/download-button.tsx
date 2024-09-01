import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { api } from "~/trpc/react";

interface DownloadButtonProps {
  fileId: number;
  downloadCount: number;
}

export const DownloadButton = ({
  fileId,
  downloadCount,
}: DownloadButtonProps) => {
  const downloadMutation = api.subtitles.downloadSubtitle.useMutation();

  const handleDownload = async () => {
    try {
      const result = await downloadMutation.mutateAsync({ fileId });
      const encodedUrl = encodeURIComponent(result.link);
      const encodedFileName = encodeURIComponent(result.file_name);
      const backendUrl = `/api/download-subtitle?url=${encodedUrl}&fileName=${encodedFileName}`;
      window.open(backendUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // TO-DO: You might want to show an error message to the user here
    }
  };

  return (
    <Button
      variant="gradient"
      leftSection={<IconDownload />}
      onClick={() => void handleDownload()}
      loading={downloadMutation.isPending}
    >
      {downloadCount}
    </Button>
  );
};
