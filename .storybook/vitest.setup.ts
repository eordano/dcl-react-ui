import "@testing-library/jest-dom/vitest";
import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import * as previewAnnotations from "./preview";

const project = setProjectAnnotations([a11yAddonAnnotations, previewAnnotations]);
beforeAll(project.beforeAll);
