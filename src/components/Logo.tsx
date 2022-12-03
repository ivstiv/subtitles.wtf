import { Box } from "@mantine/core"
import Image from "next/image"

export const Logo = () => {
    return (
      <Box
        sx={{
          xs: {
            width: "35%"
          }
        }}
      >
        <Image
          unoptimized
          src="/images/logo.png"
          alt="Logo"
          width="635"
          height="158"
          priority={true}
          // sizes="(max-width: 768px) 100vw,
          //   (max-width: 1200px) 50vw,
          //   33vw"
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
    )
}