/**
 * Visual Blocks Language
 *
 * Copyright 2020 Arthur Zheng.
 * https://github.com/zhengyangliu/scratch-blocks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 'use strict';

 goog.provide('Blockly.Arduino.unoStart');
 
 goog.require('Blockly.Arduino');
 
 
 Blockly.Arduino['arduino_pin_setUnoStartPinMode'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || '0';
   var arg1 = block.getFieldValue('MODE') || 'INPUT';
   var code = "pinMode(" + arg0 + ", " + arg1 + ");\n";
   return code;
 };
 
 Blockly.Arduino['arduino_pin_setUnoStartDigitalOutput'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || '0';
   var arg1 = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'LOW';
   var code = "digitalWrite(" + arg0 + ", " + arg1 + ");\n";
   return code;
 };
 
 Blockly.Arduino['arduino_pin_setUnoStartPwmOutput'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || '0';
   var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
   var code = "analogWrite(" + arg0 + ", " + arg1 + ");\n";
   return code;
 };
 
 
 Blockly.Arduino['arduino_pin_readUnoStartDigitalPin'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || '0';
   var level = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'HIGH';
 
   var code = "(digitalRead(" + arg0 + ")==" + (level == 'HIGH' ? 1 : 0) + ")";
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
 
 Blockly.Arduino['arduino_pin_readUnoStartAnalogPin'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || 'A1';
   var code = "analogRead(" + arg0 + ")";
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };


  Blockly.Arduino['arduino_pin_readUnoStartDigitalPinNum'] = function(block) {
    var arg0 = block.getFieldValue('PIN') || '0';
    var code = "digitalRead(" + arg0 + ")";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };


 
 Blockly.Arduino['arduino_pin_setUnoStartServoOutput'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || 'A1';
   var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
 
   Blockly.Arduino.includes_['include_servo'] = '#include <Servo.h>';
   Blockly.Arduino.definitions_['definitions_servo' + arg0] = 'Servo servo_' + arg0 + ';';
   Blockly.Arduino.setups_['setups_servo' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ');';
 
   var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
   return code;
 };
 
 Blockly.Arduino['arduino_pin_unoStartAttachInterrupt'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || '2';
   var arg1 = block.getFieldValue('MODE') || 'RISING';
 
   var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
   branch = Blockly.Arduino.addLoopTrap(branch, block.id);
 
   Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
     'void ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';
 
   var code = 'attachInterrupt(digitalPinToInterrupt(' + arg0 + '), ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
   return code;
 };
 
 
 Blockly.Arduino['arduino_pin_unoStartDetachInterrupt'] = function(block) {
   var arg0 = block.getFieldValue('PIN') || '2';
 
   var code = 'detachInterrupt(digitalPinToInterrupt(' + arg0 + ');\n';
   return code;
 };
 
 Blockly.Arduino['arduino_serial_unoStartSerialBegin'] = function(block) {
   var arg0 = block.getFieldValue('VALUE') || '9600';
 
   var code = 'Serial.begin(' + arg0 + ');\n';
   return code;
 };
 
 Blockly.Arduino['arduino_serial_unoStartSerialPrint'] = function(block) {
   var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
   var eol = block.getFieldValue('EOL') || 'warp';
   var code = '';
   if (eol === 'warp') {
     code = 'Serial.println(' + arg0 + ');\n';
   } else {
     code = 'Serial.print(' + arg0 + ');\n';
   }
   return code;
 };
 
 Blockly.Arduino['arduino_serial_unoStartSerialAvailable'] = function() {
   var code = 'Serial.available()';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
 
 Blockly.Arduino['arduino_serial_unoStartSerialReadData'] = function() {
   var code = 'Serial.read()';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
 
 Blockly.Arduino['arduino_data_unoStartDataMap'] = function(block) {
   var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
   var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
   var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;
   var arg3 = Blockly.Arduino.valueToCode(block, 'ARG2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
   var arg4 = Blockly.Arduino.valueToCode(block, 'ARG3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1000;
 
   var code = 'map(' + arg0 + ', ' + arg1 + ', ' + arg2 + ', ' + arg3 + ', ' + arg4 + ')';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
 
 Blockly.Arduino['arduino_data_unoStartDataConstrain'] = function(block) {
   var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
   var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
   var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;
 
   var code = 'constrain(' + arg0 + ', ' + arg1 + ', ' + arg2 + ')';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
 
 Blockly.Arduino['arduino_data_unoStartDataConvert'] = function(block) {
   var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
   var arg1 = block.getFieldValue('TYPE') || 'INTEGER';
 
   var code;
 
   switch(arg1) {
     case 'INTEGER':
       code = 'String(' + arg0 + ').toInt()';
       break;
     case 'DECIMAL':
       code = 'String(' + arg0 + ').toFloat()';
       break;
     case 'STRING':
       code = 'String(' + arg0 + ')';
       break;
   }
 
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
 
 Blockly.Arduino['arduino_data_unoStartDataConvertASCIICharacter'] = function(block) {
   var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
 
   var code = 'String(char(' + arg0 + '))';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
 
 Blockly.Arduino['arduino_data_unoStartDataConvertASCIINumber'] = function(block) {
   var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'a';
 
   var code = 'toascii(String(' + arg0 + ')[0])';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };
