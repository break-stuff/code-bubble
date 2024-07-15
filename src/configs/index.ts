import { CpSandboxConfig } from "./code-pen-sandbox";
import { ComponentConfig } from "./component-config";
import { SbApiConfig } from "./stack-blitz-configs";

export type StackBlitzConfig = ComponentConfig & {
  sandbox: SbApiConfig
}

export type CodePenConfig = ComponentConfig &  {
  sandbox: CpSandboxConfig
}