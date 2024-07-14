import { CpSandboxConfig } from "./code-pen-sandbox";
import { ComponentConfig } from "./component-config";
import { SbSandboxConfig } from "./stack-blitz-configs";

export type StackBlitzConfig = ComponentConfig & {
  sandbox: SbSandboxConfig
}

export type CodePenConfig = ComponentConfig &  {
  sandbox: CpSandboxConfig
}