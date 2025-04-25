# install deps
sudo pacman -S qemu-user-static qemu-user-static-binfmt

# setup arm64 image
curl -LO http://os.archlinuxarm.org/os/ArchLinuxARM-aarch64-latest.tar.gz
mkdir ./arm64
sudo bsdtar -xpf ArchLinuxARM-aarch64-latest.tar.gz -C ./arm64

# enter the arm64 image either by -
    # using nspawn (recommended)
        sudo systemd-nspawn -D ./arm64 --bind-ro=/etc/resolv.conf
    # or, using chroot
        sudo mount --bind ./arm64 ./arm64
        sudo arch-chroot ./arm64

#########################-inside arm64-#########################

    # init pacman
    pacman-key --init
    pacman-key --populate archlinuxarm
    pacman -Syyu --noconfirm --disable-download-timeout

    # install deps
    pacman -S --noconfirm --disable-download-timeout unzip git cmake ninja clang pkgconf webkitgtk-6.0

    # install bun
    touch ~/.bashrc
    curl -fsSL https://bun.sh/install | bash
    source ~/.bashrc

    # build libwebview
    git clone --recurse-submodules https://github.com/tr1ckydev/webview-bun
    cd webview-bun
    bun run build

    # output at ./build/libwebview-arm64.so

################################################################

# after exiting chroot (skip, if used nspawn)
sudo umount ./arm64