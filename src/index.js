import Phaser from 'phaser';

import roundButtons from './assets/buttons-round-200x201.png'

class WalletConnect extends Phaser.Scene {
    sprites = {};

    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet('roundButtons', roundButtons, {
            frameWidth: 200,
            frameHeight: 201,
            endFrame: 9,
        });
    }

    create() {
        //const s1 = this.add.sprite(100, 100, 'roundButtons', 0);
        //const s2 = this.add.sprite(100, 300, 'roundButtons', 4);
        const s1 = this.add.circle(100, 100, 50, 0xffcc00);
        const hitArea = new Phaser.Geom.Circle(50, 50, 50);
        s1.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
        s1.on('pointerover', this.onOver, this);
        s1.on('pointerout', this.onOut, this);
        s1.on('pointerdown', this.onClick, this);

        const w = this.add.sprite(100, 300, 'roundButtons', 4);
        w.setScale(0.5);
        this.sprites.wbutton = w;
        const hitArea2 = new Phaser.Geom.Circle(50, 50, 100);
        w.setInteractive(hitArea2, Phaser.Geom.Circle.Contagins);
        w.on('pointerover', this.onOverW, this);
        w.on('pointerout', this.onOutW, this);
        console.log(s1);
        this.sprites.button = s1;
    }

    onClick(button) {
        console.log('clicked', button);
    }

    onOver(button) {
        this.sprites.button.fillColor = 0x00ff00;
        console.log('over', button);
    }

    onOverW(button) {
        this.sprites.wbutton.setFrame(5);
        console.log('overW', button);
    }

    onOutW(button) {
        this.sprites.wbutton.setFrame(4);
        console.log('overW', button);
    }

    onOut(button) {
        this.sprites.button.fillColor = 0xffcc00;
        console.log('out', button);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: WalletConnect,
};

const game = new Phaser.Game(config);
