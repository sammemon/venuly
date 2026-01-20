export const passwordResetEmailTemplate = (resetLink: string, expiresInHours: number = 1) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="background-color: #f5f5f5; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Venuly</h1>
                <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Event Organizing Marketplace</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
                <h2 style="color: #333; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                
                <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6; font-size: 15px;">
                    We received a request to reset the password for your Venuly account. Click the button below to create a new password:
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 32px 0;">
                    <a href="${resetLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                        Reset Password
                    </a>
                </div>

                <p style="color: #999; margin: 24px 0 0 0; font-size: 13px; line-height: 1.6;">
                    Or copy this link into your browser:<br>
                    <span style="color: #667eea; word-break: break-all;">${resetLink}</span>
                </p>

                <!-- Expiry Info -->
                <div style="background-color: #f9f9f9; border-left: 4px solid #667eea; padding: 16px; margin: 24px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #666; font-size: 14px;">
                        <strong>⏱️ This link expires in ${expiresInHours} hour${expiresInHours > 1 ? 's' : ''}.</strong> If you don't reset your password by then, you'll need to request a new link.
                    </p>
                </div>

                <p style="color: #666; margin: 24px 0 0 0; line-height: 1.6; font-size: 14px;">
                    Didn't request a password reset? No problem! Your account is still secure. Just ignore this email or contact our support team if you have concerns.
                </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9f9f9; padding: 24px 30px; border-top: 1px solid #eee; border-radius: 0 0 8px 8px; text-align: center;">
                <p style="margin: 0; color: #999; font-size: 13px; line-height: 1.6;">
                    © 2026 Venuly. All rights reserved.<br>
                    <a href="https://venuly.dev" style="color: #667eea; text-decoration: none;">Visit our website</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const welcomeEmailTemplate = (userName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Venuly</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="background-color: #f5f5f5; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Venuly</h1>
                <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Event Organizing Marketplace</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
                <h2 style="color: #333; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Welcome to Venuly, ${userName}!</h2>
                
                <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6; font-size: 15px;">
                    We're excited to have you join our community. Whether you're organizing events or exploring opportunities, Venuly is your platform for success.
                </p>

                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 24px 0;">
                    <h3 style="color: #333; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Get Started:</h3>
                    <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px;">
                        <li style="margin: 8px 0;">Complete your profile</li>
                        <li style="margin: 8px 0;">Browse available events</li>
                        <li style="margin: 8px 0;">Create your first event</li>
                    </ul>
                </div>

                <p style="color: #666; margin: 24px 0 0 0; line-height: 1.6; font-size: 14px;">
                    Have questions? Check out our <a href="https://venuly.dev/help" style="color: #667eea; text-decoration: none;">help center</a> or reach out to our support team.
                </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9f9f9; padding: 24px 30px; border-top: 1px solid #eee; border-radius: 0 0 8px 8px; text-align: center;">
                <p style="margin: 0; color: #999; font-size: 13px; line-height: 1.6;">
                    © 2026 Venuly. All rights reserved.<br>
                    <a href="https://venuly.dev" style="color: #667eea; text-decoration: none;">Visit our website</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;
