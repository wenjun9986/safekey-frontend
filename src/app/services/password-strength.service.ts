import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  constructor() { }
  calculateStrength(password: string): { strength: number, label: string, barColor: string, labelColor: string } {
    if (!password) return { strength: 0, label: 'None', barColor: 'warn', labelColor: '#FF0000' };
    let strength = 0;
    const hasNumbers = /\d/.test(password) ? 1 : 0;
    const hasLower = /[a-z]/.test(password) ? 1 : 0;
    const hasUpper = /[A-Z]/.test(password) ? 1 : 0;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0;

    strength += hasNumbers + hasLower + hasUpper + hasSpecial;
    strength += password.length > 12 ? 1 : 0;

    const percentage = (strength / 5) * 100;
    const label = this.getLabel(percentage);
    const barColor = this.getLabelColor(percentage);
    const labelColor = this.getLabelColor(percentage);

    return { strength: percentage, label, barColor, labelColor };
  }

  private getLabel(percentage: number): string {
    if (percentage <= 20) return 'Very Weak';
    if (percentage <= 40) return 'Weak';
    if (percentage <= 60) return 'Average';
    if (percentage <= 80) return 'Strong';
    return 'Very Strong';
  }

  private getLabelColor(strength: number): string {
    if (strength <= 20) return '#FF0000';  // Red
    if (strength <= 40) return '#FFA500';  // Orange
    if (strength <= 60) return '#FFFF00';  // Yellow
    if (strength <= 80) return '#008000';  // Green
    return '#0000FF';  // Blue
  }
}
