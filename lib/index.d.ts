import { ProjectBuildOptions } from './builds';
export { ProjectBuildOptions, applyBuildPreset } from './builds';
/**
 * The default globs for matching all user application source files.
 */
export declare const defaultSourceGlobs: string[];
export interface LintOptions {
    /**
     * The lint rules to run. Can be the code of a collection of rules like
     * "polymer-2" or an individual rule like "dom-module-invalid-attrs".
     */
    rules: string[];
    /**
     * Warnings to ignore. After the rules are run, any warning that matches
     * one of these codes is ignored, project-wide.
     */
    ignoreWarnings?: string[];
}
export interface ProjectOptions {
    /**
     * Path to the root of the project on the filesystem. This can be an absolute
     * path, or a path relative to the current working directory. Defaults to the
     * current working directory of the process.
     */
    root?: string;
    /**
     * The path relative to `root` of the entrypoint file that will be served for
     * app-shell style projects. Usually this is index.html.
     */
    entrypoint?: string;
    /**
     * The path relative to `root` of the app shell element.
     */
    shell?: string;
    /**
     * The path relative to `root` of the lazily loaded fragments. Usually the
     * pages of an app or other bundles of on-demand resources.
     */
    fragments?: string[];
    /**
     * List of glob patterns, relative to root, of this project's sources to read
     * from the file system.
     */
    sources?: string[];
    /**
     * List of file paths, relative to the project directory, that should be
     * included as extraDependencies in the build target.
     */
    extraDependencies?: string[];
    /**
     * List of build option configurations.
     */
    builds?: ProjectBuildOptions[];
    /**
     * Options for the Polymer Linter.
     */
    lint?: LintOptions;
    /**
     * File to write bundle manifest to.
     */
    bundleManifest?: string;
}
export declare class ProjectConfig {
    readonly root: string;
    readonly entrypoint: string;
    readonly shell?: string;
    readonly fragments: string[];
    readonly sources: string[];
    readonly extraDependencies: string[];
    readonly bundleManifest: string;
    readonly builds: ProjectBuildOptions[];
    readonly allFragments: string[];
    readonly lint: LintOptions | undefined;
    /**
     * Given an absolute file path to a polymer.json-like ProjectOptions object,
     * read that file. If no file exists, null is returned. If the file exists
     * but there is a problem reading or parsing it, throw an exception.
     *
     * TODO: make this method and the one below async.
     */
    static loadOptionsFromFile(filepath: string): ProjectOptions | null;
    /**
     * Given an absolute file path to a polymer.json-like ProjectOptions object,
     * return a new ProjectConfig instance created with those options.
     */
    static loadConfigFromFile(filepath: string): ProjectConfig | null;
    /**
     * constructor - given a ProjectOptions object, create the correct project
     * configuration for those options. This involves setting the correct
     * defaults, validating options, warning on deprecated options, and
     * calculating some additional properties.
     */
    constructor(options: ProjectOptions);
    isFragment(filepath: string): boolean;
    isShell(filepath: string): boolean;
    isSource(filepath: string): boolean;
    /**
     * Validates that a configuration is accurate, and that all paths are
     * contained within the project root.
     */
    validate(): boolean;
    /**
     * Generate a JSON string serialization of this configuration. File paths
     * will be relative to root.
     */
    toJSON(): string;
}
