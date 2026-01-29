import createMDX from '@next/mdx';
import type { NextConfig } from "next";

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // experimental: {
  //   mdxRs: true, // Optional: use Rust-based MDX compiler
  // },
};

export default withMDX(nextConfig);
