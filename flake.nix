{
  description = "ui3 — dcl-react-ui Storybook static component catalog";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f (import nixpkgs { inherit system; }));
    in
    {
      packages = forAllSystems (
        pkgs:
        let
          nodejs = pkgs.nodejs_24;
        in
        rec {
          storybook = pkgs.buildNpmPackage {
            pname = "ui3-storybook";
            version = "0.0.0";
            src = ./.;
            inherit nodejs;
            npmDepsHash = "sha256-Oz4GTvcdeSmpdRw03YOn7jUdcutT4Ve6bCHBu0TFXeQ=";

            npmBuildScript = "build-storybook";

            nativeBuildInputs = [ pkgs.rsync ];

            installPhase = ''
              runHook preInstall
              mkdir -p $out
              cp -r storybook-static/. $out/
              runHook postInstall
            '';
          };
          default = storybook;
        }
      );
    };
}
