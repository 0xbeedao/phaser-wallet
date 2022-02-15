import Phaser from 'phaser';

import roundButtons from './assets/buttons-round-200x201.png'
import { connect } from './wallet';

const BUTTON_FRAMES = {
    INACTIVE: 8,
    CONNECTING: 4,
    CONNECTED: 6,
};

class WalletConnect extends Phaser.Scene {
    sprites = {};
    spriteFrames = { 'wallet': BUTTON_FRAMES.INACTIVE };
    provider = null;

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
        console.log('create', this.width);
        const wallet = this.add.sprite(this.game.config.width - 100, 50, 'roundButtons', BUTTON_FRAMES.INACTIVE);
        wallet.setScale(0.35);
        this.makeWalletInteractive(wallet);
        this.sprites.wallet = wallet;
    }

    makeWalletInteractive(wallet) {
        const hitArea = new Phaser.Geom.Circle(50, 50, 100);
        wallet.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
        wallet.on('pointerover', this.onOver, this);
        wallet.on('pointerout', this.onOut, this);
        wallet.on('pointerdown', this.onClick, this);
    }

    async onClick(button) {
        if (this.connected) {
            console.log('disconnected');
            this.spriteFrames.wallet = BUTTON_FRAMES.INACTIVE;
            this.setSpriteFrame('wallet', false);
            this.connected = false;
            this.provider.disconnect();
            return;
        }
        console.log('connecting', button);
        this.sprites.wallet.removeInteractive();
        this.spriteFrames.wallet = BUTTON_FRAMES.CONNECTING;
        this.setSpriteFrame('wallet', false);
        const provider = await connect();
        console.log('connected', provider);
        if (provider) {
            this.spriteFrames.wallet = BUTTON_FRAMES.CONNECTED;
            this.connected = true;
            this.provider = provider;
        } else {
            this.connected = false;
            this.spriteFrames.wallet = BUTTON_FRAMES.INACTIVE;
        }
        this.setSpriteFrame('wallet', false);
        this.makeWalletInteractive(this.sprites.wallet);
    }

    onOver(button) {
        this.setSpriteFrame('wallet', true);
        console.log('over', button);
    }

    onOut(button) {
        this.setSpriteFrame('wallet', false);
        console.log('out', button);
    }

    setSpriteFrame(key, hover) {
        const index = this.spriteFrames[key] + (hover ? 1 : 0);
        this.sprites[key].setFrame(index);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: WalletConnect,
};

const game = new Phaser.Game(config);
