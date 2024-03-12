<?php

namespace StructureLoader;

use pocketmine\plugin\PluginBase;
use pocketmine\block\Block;
use pocketmine\math\Vector3;
use pocketmine\command\Command;
use pocketmine\command\CommandSender;

class Loader extends PluginBase {
	public function setTile($x, $y, $z, $blockId, $world) {
		$block = Block::get($blockId);
        $position = new Vector3($x, $y, $z);
        $block = $block->getId() === Block::STILL_WATER ? Block::get(Block::WATER) : $block;
        $world->setBlock($position, $block);
    }
	public function Loader($p, $StructureFile) {
		$world = $p->getLevel();
		$StructureFileContent = file_get_contents($StructureFile . ".sd");
		$StructureLines = explode("\n", $StructureFileContent);
		$StructureData = [];

		foreach ($StructureLines as $line) {
			$lineValues = explode(" ", $line);
			$StructureData[] = $lineValues;
		}

		$StructureLength = count($StructureData);

		for ($i = 0; $i < $StructureLength; $i++) {
			$this->setTile((int)$StructureData[$i][1], (int)$StructureData[$i][2], (int)$StructureData[$i][3], (int)$StructureData[$i][0], $world);
		}
	}
	public function onCommand(CommandSender $p, Command $cmd, $label, array $args) {
		if ($cmd->getName() == ".load") {
			if (! isset($args[0])) {
				$args[0] = "structure";
			}
			$this->Loader($p, $args[0]);
		}
	}
}
	