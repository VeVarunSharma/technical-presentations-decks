# GitHub Advanced Security in the AI SDLC — sources

Last reviewed: 2026-07-15

## Core product and documentation sources

| Source | Purpose |
|---|---|
| [GitHub Advanced Security products](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security) | Product packaging and capabilities |
| [Code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning) | Code scanning and CodeQL model |
| [Security and quality AI application card](https://docs.github.com/en/code-security/responsible-use/security-and-quality-ai-features) | Copilot Autofix, AI detections, generic secret detection, responsible use |
| [Secret scanning](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning) | Secret detection, validity checks, custom and generic patterns |
| [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) | Blocking secrets before they enter repositories |
| [Dependency graph](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-graph) | Dependency inventory, SBOM, and supply-chain context |
| [Dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review) | Pull-request dependency risk review |
| [Security overview](https://docs.github.com/en/code-security/concepts/security-at-scale/security-overview) | Organization and enterprise risk visibility |
| [Security campaigns](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/remediate-alerts-at-scale/creating-managing-security-campaigns) | Remediation at scale |
| [Code scanning configuration](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configure-code-scanning) | Default setup and rollout |
| [Application security changelog feed](https://github.blog/changelog/label/application-security/feed/) | Complete application-security release feed |
| [Filtered application security changelog](https://github.blog/changelog/?label=application-security&opened-months=7) | Seven-month release window used in the deck |

## Application-security changelog coverage

The deck includes all **79** entries returned for the application-security label from 2026-01-01 through 2026-07-15. The interactive release explorer uses the generated dataset in `data/application-security-changelog.json`.

### 2026-07

| Date | Update | Category |
|---|---|---|
| 2026-07-14 | [Code scanning shows AI security detections on pull requests](https://github.blog/changelog/2026-07-14-code-scanning-shows-ai-security-detections-on-pull-requests/) | AI & agent security |
| 2026-07-14 | [Security reviews now available in the GitHub Copilot app](https://github.blog/changelog/2026-07-14-security-reviews-now-available-in-the-github-copilot-app/) | AI & agent security |
| 2026-07-13 | [Manage secret scanning custom patterns via REST API](https://github.blog/changelog/2026-07-13-create-and-manage-secret-scanning-custom-patterns-via-rest-api/) | Secret protection |
| 2026-07-13 | [GitHub Code Quality license estimate in public preview](https://github.blog/changelog/2026-07-13-github-code-quality-license-estimate-in-public-preview/) | Code quality & coverage |
| 2026-07-10 | [CodeQL 2.26.0 adds Kotlin 2.4.0 support and AI prompt injection detection](https://github.blog/changelog/2026-07-10-codeql-2-26-0-adds-kotlin-2-4-0-support-and-ai-prompt-injection-detection/) | Code scanning & CodeQL |
| 2026-07-10 | [Clearer names for secret scanning detector types](https://github.blog/changelog/2026-07-10-clearer-names-for-secret-scanning-detector-types/) | Secret protection |
| 2026-07-10 | [Agentic autofix for code scanning alerts in public preview](https://github.blog/changelog/2026-07-10-agentic-autofix-for-code-scanning-alerts-in-public-preview/) | AI & agent security |
| 2026-07-09 | [Organization-level targeting for GitHub Code Quality](https://github.blog/changelog/2026-07-09-organization-level-targeting-for-github-code-quality/) | Code quality & coverage |
| 2026-07-07 | [Secret scanning extended metadata and multipart validation](https://github.blog/changelog/2026-07-07-secret-scanning-extended-metadata-and-multipart-validation/) | Secret protection |
| 2026-07-01 | [Secret scanning public monitoring for enterprises](https://github.blog/changelog/2026-07-01-secret-scanning-public-monitoring-for-enterprises/) | Secret protection |
| 2026-07-01 | [Secret scanning adds validators for Asana, IBM, and MessageBird](https://github.blog/changelog/2026-07-01-secret-scanning-adds-validators-for-asana-ibm-and-messagebird/) | Secret protection |

### 2026-06

| Date | Update | Category |
|---|---|---|
| 2026-06-30 | [GitHub code coverage merge protection for pull requests](https://github.blog/changelog/2026-06-30-github-code-coverage-merge-protection-for-pull-requests/) | Code quality & coverage |
| 2026-06-30 | [Upcoming cloud data retention policy for closed security alerts](https://github.blog/changelog/2026-06-30-cloud-data-retention-policy-for-closed-security-alerts/) | Governance & platform |
| 2026-06-30 | [Upcoming access restrictions to public API endpoints and UI views](https://github.blog/changelog/2026-06-30-upcoming-access-restrictions-to-public-api-endpoints-and-ui-views/) | Governance & platform |
| 2026-06-24 | [Self-service credential revocation for incident response](https://github.blog/changelog/2026-06-24-self-service-credential-revocation-for-incident-response/) | Secret protection |
| 2026-06-23 | [Secret scanning adds extended metadata for Replicate secrets](https://github.blog/changelog/2026-06-23-secret-scanning-adds-extended-metadata-for-replicate-secrets/) | Secret protection |
| 2026-06-23 | [Fetch Code Quality findings via REST API](https://github.blog/changelog/2026-06-23-fetch-code-quality-findings-via-rest-api/) | Code quality & coverage |
| 2026-06-17 | [Secret scanning updates – June 2026](https://github.blog/changelog/2026-06-17-secret-scanning-updates-june-2026/) | Secret protection |
| 2026-06-16 | [GitHub Code Quality generally available July 20, 2026](https://github.blog/changelog/2026-06-16-github-code-quality-generally-available-july-20-2026/) | Code quality & coverage |
| 2026-06-16 | [Organization-level enablement for GitHub Code Quality](https://github.blog/changelog/2026-06-16-organization-level-enablement-for-github-code-quality/) | Code quality & coverage |
| 2026-06-10 | [Incremental analysis for Go, C/C++, and CodeQL CLI](https://github.blog/changelog/2026-06-10-incremental-analysis-for-go-c-c-and-codeql-cli/) | Code scanning & CodeQL |
| 2026-06-10 | [Dedicated security review command now available in Copilot CLI](https://github.blog/changelog/2026-06-10-dedicated-security-review-command-now-available-in-copilot-cli/) | AI & agent security |
| 2026-06-09 | [Periodic code scanning of inactive repositories](https://github.blog/changelog/2026-06-09-periodic-code-scanning-of-inactive-repositories/) | Code scanning & CodeQL |
| 2026-06-09 | [Security validation for third-party coding agents](https://github.blog/changelog/2026-06-09-security-validation-for-third-party-coding-agents/) | AI & agent security |
| 2026-06-05 | [CodeQL 2.25.6 adds Swift 6.3.2 support and improves C# coverage](https://github.blog/changelog/2026-06-05-codeql-2-25-6-adds-swift-6-3-2-support-and-improves-c-coverage/) | Code scanning & CodeQL |
| 2026-06-02 | [Cloud and local sandboxes for GitHub Copilot now in public preview](https://github.blog/changelog/2026-06-02-cloud-and-local-sandboxes-for-github-copilot-now-in-public-preview/) | AI & agent security |

### 2026-05

| Date | Update | Category |
|---|---|---|
| 2026-05-28 | [Hard budget limits now available for GitHub Advanced Security](https://github.blog/changelog/2026-05-28-hard-budget-limits-now-available-for-github-advanced-security/) | Governance & platform |
| 2026-05-28 | [CodeQL 2.25.5 improves query accuracy for GitHub Actions](https://github.blog/changelog/2026-05-28-codeql-2-25-5-improves-query-accuracy-for-github-actions/) | Code scanning & CodeQL |
| 2026-05-26 | [GitHub Code Quality: Repository Enablement API](https://github.blog/changelog/2026-05-26-github-code-quality-repository-enablement-api/) | Code quality & coverage |
| 2026-05-26 | [Filter secret scanning approval requests by sort order and bypass status](https://github.blog/changelog/2026-05-26-filter-secret-scanning-approval-requests-by-sort-order-and-bypass-status/) | Secret protection |
| 2026-05-26 | [Code coverage on pull requests is now in public preview](https://github.blog/changelog/2026-05-26-code-coverage-in-pull-requests-is-now-in-public-preview/) | Code quality & coverage |
| 2026-05-19 | [Expanded OIDC support for Dependabot and code scanning](https://github.blog/changelog/2026-05-19-expanded-oidc-support-for-dependabot-and-code-scanning/) | Code scanning & CodeQL |
| 2026-05-19 | [Start a GitHub Advanced Security trial from a risk assessment](https://github.blog/changelog/2026-05-19-start-a-github-advanced-security-trial-from-a-risk-assessment/) | Governance & platform |
| 2026-05-19 | [Removal of code_scanning_upload field from rate_limit API endpoint](https://github.blog/changelog/2026-05-19-removal-of-code_scanning_upload-field-from-rate_limit-api-endpoint/) | Governance & platform |
| 2026-05-12 | [CodeQL 2.25.4 adds Swift 6.3.1 support, improvements to C# and Java, and more](https://github.blog/changelog/2026-05-12-codeql-2-25-4-adds-swift-6-3-1-support-improvements-to-c-and-java-and-more/) | Code scanning & CodeQL |
| 2026-05-08 | [CodeQL 2.25.3 adds Swift 6.3 support](https://github.blog/changelog/2026-05-08-codeql-2-25-3-adds-swift-6-3-support/) | Code scanning & CodeQL |
| 2026-05-05 | [Secret scanning with GitHub MCP Server is now generally available](https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/) | AI & agent security |
| 2026-05-05 | [Code-to-cloud risk visibility with Microsoft Defender for Cloud is now generally available](https://github.blog/changelog/2026-05-05-code-to-cloud-risk-visibility-with-microsoft-defender-for-cloud-is-now-generally-available/) | Supply chain & runtime |
| 2026-05-05 | [Deprecation notice: code_scanning_upload field will be removed from rate_limit API endpoint](https://github.blog/changelog/2026-05-05-deprecation-notice-code_scanning_upload-field-will-be-removed-from-rate_limit-api-endpoint/) | Governance & platform |

### 2026-04

| Date | Update | Category |
|---|---|---|
| 2026-04-24 | [Notice about upcoming new format for GitHub App installation tokens](https://github.blog/changelog/2026-04-24-notice-about-upcoming-new-format-for-github-app-installation-tokens/) | Governance & platform |
| 2026-04-21 | [Deprecation of security-related organization API fields](https://github.blog/changelog/2026-04-21-deprecation-of-security-related-organization-api-fields/) | Governance & platform |
| 2026-04-21 | [CodeQL now supports sanitizers and validators in models-as-data](https://github.blog/changelog/2026-04-21-codeql-now-supports-sanitizers-and-validators-in-models-as-data/) | Code scanning & CodeQL |
| 2026-04-15 | [CodeQL 2.25.2 adds Kotlin 2.3.20 support and other updates](https://github.blog/changelog/2026-04-15-codeql-2-25-2-adds-kotlin-2-3-20-support-and-other-updates/) | Code scanning & CodeQL |
| 2026-04-14 | [OIDC support for Dependabot and code scanning](https://github.blog/changelog/2026-04-14-oidc-support-for-dependabot-and-code-scanning/) | Code scanning & CodeQL |
| 2026-04-14 | [Deployment context in repository properties and alerts](https://github.blog/changelog/2026-04-14-deployment-context-in-repository-properties-and-alerts/) | Supply chain & runtime |
| 2026-04-14 | [Link code scanning alerts to GitHub Issues](https://github.blog/changelog/2026-04-14-link-code-scanning-alerts-to-github-issues/) | Code scanning & CodeQL |
| 2026-04-14 | [Secret scanning pattern updates and product improvements](https://github.blog/changelog/2026-04-14-secret-scanning-pattern-updates-and-product-improvements/) | Secret protection |
| 2026-04-14 | [GitHub Code Quality: Improvements to standard findings in public preview](https://github.blog/changelog/2026-04-14-github-code-quality-improvements-to-standard-findings-in-public-preview/) | Code quality & coverage |
| 2026-04-09 | [Ask Copilot in security assessments now available](https://github.blog/changelog/2026-04-09-ask-copilot-in-security-assessments-now-available/) | Governance & platform |
| 2026-04-08 | [Secret scanning improvements to alert APIs, webhooks, and delegated workflows](https://github.blog/changelog/2026-04-08-secret-scanning-improvements-to-alert-apis-webhooks-and-delegated-workflows/) | Secret protection |
| 2026-04-08 | [Code Security risk assessment available for organizations](https://github.blog/changelog/2026-04-08-code-security-risk-assessment-available-for-organizations/) | Governance & platform |
| 2026-04-07 | [Prioritize security alerts with runtime context from Dynatrace](https://github.blog/changelog/2026-04-07-prioritize-security-alerts-with-runtime-context-from-dynatrace/) | Supply chain & runtime |
| 2026-04-07 | [Code scanning: Batch apply security alert suggestions on pull requests](https://github.blog/changelog/2026-04-07-code-scanning-batch-apply-security-alert-suggestions-on-pull-requests/) | Code scanning & CodeQL |
| 2026-04-02 | [The Security tab is now Security & quality](https://github.blog/changelog/2026-04-02-the-security-tab-is-now-security-quality/) | Governance & platform |

### 2026-03

| Date | Update | Category |
|---|---|---|
| 2026-03-31 | [GitHub secret scanning — coverage update](https://github.blog/changelog/2026-03-31-github-secret-scanning-nine-new-types-and-more/) | Secret protection |
| 2026-03-31 | [CodeQL 2.25.0 adds Swift 6.2.4 support](https://github.blog/changelog/2026-03-31-codeql-2-25-0-adds-swift-6-2-4-support/) | Code scanning & CodeQL |
| 2026-03-31 | [CodeQL pull requests insights on security overview now cover all protected branches](https://github.blog/changelog/2026-03-31-codeql-pull-requests-insights-on-security-overview-now-cover-all-protected-branches/) | Code scanning & CodeQL |
| 2026-03-26 | [Credential revocation API now supports GitHub OAuth and GitHub app credentials](https://github.blog/changelog/2026-03-26-credential-revocation-api-now-supports-github-oauth-and-github-app-credentials/) | Secret protection |
| 2026-03-24 | [Upcoming deprecation of security-related organization API fields](https://github.blog/changelog/2026-03-24-upcoming-deprecation-of-security-related-organization-api-fields/) | Governance & platform |
| 2026-03-24 | [Faster incremental analysis with CodeQL in pull requests](https://github.blog/changelog/2026-03-24-faster-incremental-analysis-with-codeql-in-pull-requests/) | Code scanning & CodeQL |
| 2026-03-23 | [Push protection exemptions from repository settings](https://github.blog/changelog/2026-03-23-push-protection-exemptions-from-repository-settings/) | Secret protection |
| 2026-03-17 | [Secret scanning in AI coding agents via the GitHub MCP Server](https://github.blog/changelog/2026-03-17-secret-scanning-in-ai-coding-agents-via-the-github-mcp-server/) | AI & agent security |
| 2026-03-17 | [Push protection exemptions for roles, teams, and apps](https://github.blog/changelog/2026-03-17-push-protection-exemptions-for-apps-teams-and-roles/) | Secret protection |
| 2026-03-17 | [GitHub Advanced Security setup made simple](https://github.blog/changelog/2026-03-17-github-advanced-security-setup-made-simple/) | Governance & platform |
| 2026-03-17 | [Code Quality permissions removed from security manager role](https://github.blog/changelog/2026-03-17-code-quality-permissions-removed-from-security-manager-role/) | Code quality & coverage |
| 2026-03-17 | [GitHub Code Quality: Batch apply quality suggestions on pull requests](https://github.blog/changelog/2026-03-17-github-code-quality-batch-apply-quality-suggestions-on-pull-requests/) | Code quality & coverage |
| 2026-03-10 | [Secret scanning pattern updates — March 2026](https://github.blog/changelog/2026-03-10-secret-scanning-pattern-updates-march-2026/) | Secret protection |
| 2026-03-10 | [CodeQL 2.24.3 adds Java 26 support and other improvements](https://github.blog/changelog/2026-03-10-codeql-2-24-3-adds-java-26-support-and-other-improvements/) | Code scanning & CodeQL |
| 2026-03-03 | [GitHub Code Quality enterprise policy](https://github.blog/changelog/2026-03-03-github-code-quality-enterprise-policy/) | Code quality & coverage |

### 2026-02

| Date | Update | Category |
|---|---|---|
| 2026-02-24 | [CodeQL adds Go 1.26 and Kotlin 2.3.10 support and improves query accuracy](https://github.blog/changelog/2026-02-24-codeql-adds-go-1-26-and-kotlin-2-3-10-support-and-improves-query-accuracy/) | Code scanning & CodeQL |
| 2026-02-24 | [GitHub Code Quality: Organization-level dashboard in public preview](https://github.blog/changelog/2026-02-24-github-code-quality-organization-level-dashboard-in-public-preview/) | Code quality & coverage |
| 2026-02-18 | [Secret scanning improvements to extended metadata checks](https://github.blog/changelog/2026-02-18-secret-scanning-improvements-to-extended-metadata-checks/) | Secret protection |
| 2026-02-17 | [Enterprise-wide credential management tools for incident response](https://github.blog/changelog/2026-02-17-enterprise-wide-credential-management-tools-for-incident-response/) | Secret protection |
| 2026-02-06 | [CodeQL 2.24.1 improves Maven private registry support and improves query accuracy](https://github.blog/changelog/2026-02-06-codeql-2-24-1-improves-maven-private-registry-support-and-improves-query-accuracy/) | Code scanning & CodeQL |

### 2026-01

| Date | Update | Category |
|---|---|---|
| 2026-01-29 | [CodeQL 2.24.0 adds Swift 6.2 and .NET 10 support, and improves file handling for minified JavaScript](https://github.blog/changelog/2026-01-29-codeql-2-24-0-adds-swift-6-2-support-net-10-compatibility-and-file-handling-for-minified-javascript/) | Code scanning & CodeQL |
| 2026-01-20 | [CodeQL 2.23.9 has been released](https://github.blog/changelog/2026-01-20-codeql-2-23-9-has-been-released/) | Code scanning & CodeQL |
| 2026-01-20 | [Strengthen your supply chain with code-to-cloud traceability and SLSA Build Level 3 security](https://github.blog/changelog/2026-01-20-strengthen-your-supply-chain-with-code-to-cloud-traceability-and-slsa-build-level-3-security/) | Supply chain & runtime |
| 2026-01-15 | [Secret scanning extended metadata to be automatically enabled for certain repositories](https://github.blog/changelog/2026-01-15-secret-scanning-extended-metadata-to-be-automatically-enabled-for-certain-repositories/) | Secret protection |
| 2026-01-13 | [New fine-grained permission for artifact metadata is now generally available](https://github.blog/changelog/2026-01-13-new-fine-grained-permission-for-artifact-metadata-is-now-generally-available/) | Supply chain & runtime |

