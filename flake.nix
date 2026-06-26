# Nix build of the ui3 Storybook static catalog (the component library browser
# served at /ui/). buildNpmPackage like sites/flake.nix, so the published catalog
# is a pinned /nix/store artifact instead of a mutable working-tree dir.
#
# The wearable-preview 3D avatar (three.js) now lives inside ui3
# (src/wearable-preview), so three is a regular ui3 dependency and the build needs
# no external sources — consumers tree-shake it (no ui3 *component* imports it; it
# reaches the avatar surfaces only via the avatarPreview prop in stories).
{
  description = "ui3 — dcl-react-ui Storybook static component catalog";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f (import nixpkgs { inherit system; }));
    in
    {
      packages = forAllSystems (pkgs:
        let
          # nodejs_24 — the monorepo-wide pin (catalyrst/sites/umbrella all use it).
          nodejs = pkgs.nodejs_24;
        in
        rec {
          storybook = pkgs.buildNpmPackage {
            pname = "ui3-storybook";
            version = "0.0.0";
            src = ./.;
            inherit nodejs;
            # Recompute on a deps bump: prefetch-npm-deps package-lock.json
            npmDepsHash = "sha256-ngYHMWwv4CGREL0hJLmstOamGRg9zNqR/OM6w8w+cB8=";

            # `npm run build-storybook` == `storybook build -o storybook-static`.
            npmBuildScript = "build-storybook";

            # Publish just the static catalog at $out (nginx aliases this path).
            installPhase = ''
              runHook preInstall
              mkdir -p $out
              cp -r storybook-static/. $out/
              runHook postInstall
            '';
          };
          default = storybook;
        });
    };
}
